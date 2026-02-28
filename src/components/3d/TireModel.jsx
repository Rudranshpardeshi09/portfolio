import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import useThemeStore from '../../store/themeStore';

// Single spoke/project segment
function ProjectSpoke({ index, total, project, isSelected, onSelect, themeColor }) {
    const meshRef = useRef();
    const angle = (index / total) * Math.PI * 2;
    const radius = 2.8;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    useFrame((state) => {
        if (meshRef.current) {
            // Gentle float
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.08;
            // Scale pulse when selected
            const targetScale = isSelected ? 1.3 : 1;
            meshRef.current.scale.lerp(
                new THREE.Vector3(targetScale, targetScale, targetScale),
                0.1
            );
        }
    });

    return (
        <group position={[x, 0, z]} ref={meshRef}>
            {/* Spoke connector */}
            <mesh rotation={[0, -angle + Math.PI / 2, 0]}>
                <boxGeometry args={[radius * 0.8, 0.05, 0.05]} />
                <meshStandardMaterial
                    color={isSelected ? themeColor : '#333'}
                    emissive={isSelected ? themeColor : '#111'}
                    emissiveIntensity={isSelected ? 0.5 : 0.1}
                />
            </mesh>

            {/* Project node */}
            <mesh
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(project.id);
                }}
            >
                <dodecahedronGeometry args={[0.35, 0]} />
                <meshStandardMaterial
                    color={project.color}
                    emissive={project.color}
                    emissiveIntensity={isSelected ? 0.8 : 0.2}
                    metalness={0.7}
                    roughness={0.3}
                />
            </mesh>

            {/* Glow ring on selected */}
            {isSelected && (
                <mesh>
                    <ringGeometry args={[0.5, 0.55, 32]} />
                    <meshBasicMaterial color={themeColor} transparent opacity={0.5} side={THREE.DoubleSide} />
                </mesh>
            )}
        </group>
    );
}

// The Tire/Rim
function TireRim({ themeColor }) {
    const tireRef = useRef();

    useFrame((state) => {
        if (tireRef.current) {
            tireRef.current.rotation.y += 0.003;
        }
    });

    const rimColor = useMemo(() => themeColor, [themeColor]);

    return (
        <group ref={tireRef}>
            {/* Outer tire - torus */}
            <mesh>
                <torusGeometry args={[3.2, 0.4, 16, 64]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    roughness={0.9}
                    metalness={0.1}
                />
            </mesh>

            {/* Inner rim */}
            <mesh>
                <torusGeometry args={[3.2, 0.15, 8, 64]} />
                <meshStandardMaterial
                    color={rimColor}
                    emissive={rimColor}
                    emissiveIntensity={0.3}
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>

            {/* Hub center */}
            <mesh>
                <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
                <meshStandardMaterial
                    color={rimColor}
                    emissive={rimColor}
                    emissiveIntensity={0.4}
                    metalness={0.8}
                    roughness={0.3}
                />
            </mesh>

            {/* Hub cap detail */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.3, 0.03, 8, 32]} />
                <meshStandardMaterial
                    color="#555"
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>
        </group>
    );
}

// Floating particles
function Particles({ themeColor }) {
    const particlesRef = useRef();
    const count = 40;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                color={themeColor}
                transparent
                opacity={0.4}
                sizeAttenuation
            />
        </points>
    );
}

// Main exported component
export default function TireModel({ projects, selectedProject, onSelectProject }) {
    const { theme } = useThemeStore();

    return (
        <Canvas
            camera={{ position: [0, 3, 7], fov: 50 }}
            style={{ height: '100%', width: '100%' }}
            gl={{ antialias: true, alpha: true }}
        >
            {/* Lighting */}
            <ambientLight intensity={0.15} />
            <pointLight
                position={[5, 5, 5]}
                intensity={1}
                color={theme.primary}
            />
            <pointLight
                position={[-5, -3, -5]}
                intensity={0.5}
                color="#ffffff"
            />
            <spotLight
                position={[0, 8, 0]}
                angle={0.3}
                penumbra={0.5}
                intensity={0.8}
                color={theme.primary}
            />

            {/* Scene */}
            <group rotation={[Math.PI / 6, 0, 0]}>
                <TireRim themeColor={theme.primary} />

                {/* Project spokes */}
                {projects.map((project, i) => (
                    <ProjectSpoke
                        key={project.id}
                        index={i}
                        total={projects.length}
                        project={project}
                        isSelected={selectedProject === project.id}
                        onSelect={onSelectProject}
                        themeColor={theme.primary}
                    />
                ))}
            </group>

            <Particles themeColor={theme.primary} />

            {/* Controls */}
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.5}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.8}
            />
        </Canvas>
    );
}
