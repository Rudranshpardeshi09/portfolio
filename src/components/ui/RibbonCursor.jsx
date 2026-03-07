import { useEffect, useRef } from 'react';
import { Renderer, Transform, Vec3, Color, Polyline } from 'ogl';
import useThemeStore from '../../store/themeStore';

const RibbonCursor = ({
    spring = 0.035,
    friction = 0.88,
    thickness = 28,
    pointCount = 44,
    speedMultiplier = 0.55,
    enableFade = true
}) => {
    const containerRef = useRef(null);
    const { theme } = useThemeStore();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.innerHTML = '';

        const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio || 1, 2), alpha: true });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);

        gl.canvas.style.position = 'fixed';
        gl.canvas.style.top = '0';
        gl.canvas.style.left = '0';
        gl.canvas.style.width = '100vw';
        gl.canvas.style.height = '100vh';
        gl.canvas.style.pointerEvents = 'none';
        gl.canvas.style.zIndex = '60';
        container.appendChild(gl.canvas);

        const scene = new Transform();

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
      varying vec2 vUV;
      vec4 getPosition() {
          vec4 current = vec4(position, 1.0);
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
          vec2 nextScreen = next.xy * aspect;
          vec2 prevScreen = prev.xy * aspect;
          vec2 tangent = normalize(nextScreen - prevScreen);
          vec2 normal = vec2(-tangent.y, tangent.x);
          normal /= aspect;
          normal *= mix(1.0, 0.25, pow(abs(uv.y - 0.5) * 2.0, 2.0));
          float dist = length(nextScreen - prevScreen);
          normal *= smoothstep(0.0, 0.02, dist);
          float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
          float pixelWidth = current.w * pixelWidthRatio;
          normal *= pixelWidth * uThickness;
          current.xy -= normal * side;
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
          float fade = uEnableFade > 0.5 ? (1.0 - smoothstep(0.0, 1.0, vUV.y)) : 1.0;
          gl_FragColor = vec4(uColor, uOpacity * fade);
      }
    `;

        const points = [];
        for (let i = 0; i < pointCount; i += 1) points.push(new Vec3());

        const polyline = new Polyline(gl, {
            points,
            vertex,
            fragment,
            uniforms: {
                uColor: { value: new Color(theme.primary || '#ffffff') },
                uThickness: { value: thickness },
                uOpacity: { value: 0.92 },
                uResolution: { value: new Float32Array([gl.canvas.width, gl.canvas.height]) },
                uDPR: { value: Math.min(window.devicePixelRatio || 1, 2) },
                uEnableFade: { value: enableFade ? 1.0 : 0.0 }
            }
        });
        polyline.mesh.setParent(scene);

        const resize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            polyline.resize();
            polyline.mesh.program.uniforms.uResolution.value[0] = gl.canvas.width;
            polyline.mesh.program.uniforms.uResolution.value[1] = gl.canvas.height;
        };
        window.addEventListener('resize', resize);
        resize();

        const mouse = new Vec3(0, 0, 0);
        const velocity = new Vec3();
        const tmp = new Vec3();
        let initialized = false;

        const updateMouse = (e) => {
            const x = e.clientX ?? e.touches?.[0]?.clientX;
            const y = e.clientY ?? e.touches?.[0]?.clientY;
            if (x === undefined || y === undefined) return;

            mouse.set((x / window.innerWidth) * 2 - 1, (y / window.innerHeight) * -2 + 1, 0);
            if (!initialized) {
                points.forEach((p) => p.copy(mouse));
                initialized = true;
            }
        };

        window.addEventListener('mousemove', updateMouse);
        window.addEventListener('touchstart', updateMouse, { passive: true });
        window.addEventListener('touchmove', updateMouse, { passive: true });

        let frameId;
        let lastTime = performance.now();
        const tick = () => {
            frameId = requestAnimationFrame(tick);

            const now = performance.now();
            const dt = now - lastTime;
            lastTime = now;

            tmp.copy(mouse).sub(points[0]).multiply(spring);
            velocity.add(tmp).multiply(friction);
            points[0].add(velocity);

            for (let i = 1; i < points.length; i += 1) {
                const alpha = Math.min(1, (dt * speedMultiplier) / 16.0);
                points[i].lerp(points[i - 1], alpha);
            }

            polyline.updateGeometry();
            renderer.render({ scene });
        };
        tick();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', updateMouse);
            window.removeEventListener('touchstart', updateMouse);
            window.removeEventListener('touchmove', updateMouse);
            if (gl.canvas && gl.canvas.parentNode === container) container.removeChild(gl.canvas);
            renderer.gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
    }, [theme.primary, spring, friction, thickness, pointCount, speedMultiplier, enableFade]);

    return <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 60 }} />;
};

export default RibbonCursor;
