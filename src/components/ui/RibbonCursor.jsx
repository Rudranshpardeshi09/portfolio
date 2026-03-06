import { useEffect, useRef } from 'react';
import { Renderer, Transform, Vec3, Color, Polyline } from 'ogl';
import useThemeStore from '../../store/themeStore';

const RibbonCursor = ({
    baseSpring = 0.03,
    baseFriction = 0.9,
    baseThickness = 30,
    offsetFactor = 0.05,
    maxAge = 500,
    pointCount = 50,
    speedMultiplier = 0.5,
    enableFade = false,
    enableShaderEffect = false,
    effectAmplitude = 2,
}) => {
    const containerRef = useRef(null);
    const { theme } = useThemeStore();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const renderer = new Renderer({ dpr: window.devicePixelRatio || 2, alpha: true });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);

        gl.canvas.style.position = 'fixed';
        gl.canvas.style.top = '0';
        gl.canvas.style.left = '0';
        gl.canvas.style.width = '100vw';
        gl.canvas.style.height = '100vh';
        gl.canvas.style.pointerEvents = 'none';
        gl.canvas.style.zIndex = '9999';
        container.appendChild(gl.canvas);

        const scene = new Transform();
        const lines = [];

        const vertex = `
      precision highp float;
      attribute vec3 position;
      attribute vec3 next;
      attribute vec3 prev;
      attribute vec2 uv;
      attribute float side;
      uniform vec2 uResolution;
      uniform float uDPR;
      uniform float uThickness;
      uniform float uTime;
      uniform float uEnableShaderEffect;
      uniform float uEffectAmplitude;
      varying vec2 vUV;
      vec4 getPosition() {
          vec4 current = vec4(position, 1.0);
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
          vec2 nextScreen = next.xy * aspect;
          vec2 prevScreen = prev.xy * aspect;
          vec2 tangent = normalize(nextScreen - prevScreen);
          vec2 normal = vec2(-tangent.y, tangent.x);
          normal /= aspect;
          normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
          float dist = length(nextScreen - prevScreen);
          normal *= smoothstep(0.0, 0.02, dist);
          float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
          float pixelWidth = current.w * pixelWidthRatio;
          normal *= pixelWidth * uThickness;
          current.xy -= normal * side;
          if(uEnableShaderEffect > 0.5) {
            current.xy += normal * sin(uTime * 2.0 + current.x * 5.0) * uEffectAmplitude;
          }
          return current;
      }
      void main() {
          vUV = uv;
          gl_Position = getPosition();
      }
    `;

        const fragment = `
      precision highp float;
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uEnableFade;
      varying vec2 vUV;
      void main() {
          float fadeFactor = 1.0;
          if(uEnableFade > 0.5) {
              fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);
          }
          gl_FragColor = vec4(uColor, uOpacity * fadeFactor);
      }
    `;

        function resize() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            lines.forEach(line => {
                line.polyline.resize();
                if (line.polyline.mesh.program.uniforms.uResolution) {
                    line.polyline.mesh.program.uniforms.uResolution.value[0] = gl.canvas.width;
                    line.polyline.mesh.program.uniforms.uResolution.value[1] = gl.canvas.height;
                }
            });
        }
        window.addEventListener('resize', resize);

        const colors = [theme.primary, theme.gradientStart, theme.gradientEnd];
        const center = (colors.length - 1) / 2;
        colors.forEach((color, index) => {
            const spring = baseSpring + (Math.random() - 0.5) * 0.02;
            const friction = baseFriction + (Math.random() - 0.5) * 0.05;
            const thickness = baseThickness + (Math.random() - 0.5) * 5;
            const mouseOffset = new Vec3(
                (index - center) * offsetFactor,
                (Math.random() - 0.5) * 0.05,
                0
            );

            const line = {
                spring,
                friction,
                mouseVelocity: new Vec3(),
                mouseOffset
            };

            const points = [];
            for (let i = 0; i < pointCount; i++) {
                points.push(new Vec3());
            }
            line.points = points;

            line.polyline = new Polyline(gl, {
                points,
                vertex,
                fragment,
                uniforms: {
                    uColor: { value: new Color(color || '#ffffff') },
                    uThickness: { value: thickness },
                    uOpacity: { value: 0.8 },
                    uTime: { value: 0.0 },
                    uResolution: { value: new Float32Array([gl.canvas.width, gl.canvas.height]) },
                    uDPR: { value: window.devicePixelRatio || 2 },
                    uEnableShaderEffect: { value: enableShaderEffect ? 1.0 : 0.0 },
                    uEffectAmplitude: { value: effectAmplitude },
                    uEnableFade: { value: enableFade ? 1.0 : 0.0 }
                }
            });
            line.polyline.mesh.setParent(scene);
            lines.push(line);
        });

        resize();

        const mouse = new Vec3();
        const lastMouse = new Vec3();
        let hasMoved = false;

        function updateMouse(e) {
            const x = e.clientX || (e.touches && e.touches[0].clientX);
            const y = e.clientY || (e.touches && e.touches[0].clientY);
            if (x !== undefined && y !== undefined) {
                mouse.set((x / window.innerWidth) * 2 - 1, (y / window.innerHeight) * -2 + 1, 0);
                if (!hasMoved) {
                    lines.forEach(line => {
                        line.points.forEach(p => p.copy(mouse));
                    });
                    hasMoved = true;
                }
            }
        }

        window.addEventListener('mousemove', updateMouse);
        window.addEventListener('touchstart', updateMouse);
        window.addEventListener('touchmove', updateMouse);

        let frameId;
        let lastTime = performance.now();
        function update() {
            frameId = requestAnimationFrame(update);
            const currentTime = performance.now();
            const dt = currentTime - lastTime;
            lastTime = currentTime;

            lines.forEach(line => {
                tmp.copy(mouse).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring);
                line.mouseVelocity.add(tmp).multiply(line.friction);
                line.points[0].add(line.mouseVelocity);

                for (let i = 1; i < line.points.length; i++) {
                    const alpha = Math.min(1, (dt * speedMultiplier) / (maxAge / pointCount));
                    line.points[i].lerp(line.points[i - 1], alpha);
                }
                if (line.polyline.mesh.program.uniforms.uTime) {
                    line.polyline.mesh.program.uniforms.uTime.value = currentTime * 0.001;
                }
                line.polyline.updateGeometry();
            });

            renderer.render({ scene });
        }
        const tmp = new Vec3();
        update();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', updateMouse);
            window.removeEventListener('touchstart', updateMouse);
            window.removeEventListener('touchmove', updateMouse);
            cancelAnimationFrame(frameId);
            if (gl.canvas && gl.canvas.parentNode === container) {
                container.removeChild(gl.canvas);
            }
        };
    }, [theme]);

    return <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }} />;
};

export default RibbonCursor;
