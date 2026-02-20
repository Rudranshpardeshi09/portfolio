import React, { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/utils';


interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  originalX: number;
  originalY: number;
  isVisible: boolean;
}

interface Constellation {
  points: Array<{ x: number; y: number }>;
  opacity: number;
}

/**
 * SpaceBackground Component
 * Interactive space-themed background with:
 * - Starfield with constellation patterns
 * - Particles that respond to cursor movement
 * - Deep space aesthetic with neon cyan accents
 */
export const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const starsRef = useRef<Star[]>([]);
  const constellationsRef = useRef<Constellation[]>([]);
  const animationIdRef = useRef<number>();
  const isMobileRef = useRef(
    typeof window !== 'undefined' &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ),
  );

  const shouldReduceMotion = prefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // Initialize stars with random distribution
    const initStars = () => {
      starsRef.current = [];
      const starCount = isMobileRef.current ? 100 : 200;
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        starsRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.7 + 0.3,
          originalX: x,
          originalY: y,
          isVisible: true,
        });
      }
    };

    // Create constellations (connecting nearby stars)
    const initConstellations = () => {
      constellationsRef.current = [];
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      // Create random constellation patterns
      for (let i = 0; i < 8; i++) {
        const startX = Math.random() * width;
        const startY = Math.random() * height;
        const points = [];

        for (let j = 0; j < 4; j++) {
          points.push({
            x: startX + (Math.random() - 0.5) * 150,
            y: startY + (Math.random() - 0.5) * 150,
          });
        }

        constellationsRef.current.push({
          points,
          opacity: 0.15,
        });
      }
    };

    initStars();
    initConstellations();

    // Animation loop
    const animate = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      // Clear with deep space background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Draw constellations first (background layer)
      constellationsRef.current.forEach((constellation) => {
        ctx.strokeStyle = `rgba(0, 212, 255, ${constellation.opacity})`;
        ctx.lineWidth = 0.5;

        for (let i = 0; i < constellation.points.length - 1; i++) {
          ctx.beginPath();
          ctx.moveTo(constellation.points[i].x, constellation.points[i].y);
          ctx.lineTo(constellation.points[i + 1].x, constellation.points[i + 1].y);
          ctx.stroke();
        }
      });

      // Update and draw stars
      starsRef.current.forEach((star) => {
        // Calculate attraction to mouse
        const dx = mousePos.x - star.x;
        const dy = mousePos.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 250 && !isMobileRef.current) {
          // Stars move toward mouse
          const force = (250 - distance) / 250;
          star.vx += (dx / distance) * force * 1.5;
          star.vy += (dy / distance) * force * 1.5;

          // Increase opacity when near mouse
          star.opacity = Math.min(1, star.opacity + force * 0.1);
        } else {
          // Return to original position slowly
          const returnForce = 0.02;
          star.vx += (star.originalX - star.x) * returnForce;
          star.vy += (star.originalY - star.y) * returnForce;

          // Fade back to original opacity
          star.opacity += (Math.random() * 0.7 + 0.3 - star.opacity) * 0.05;
        }

        // Apply friction and speed limits
        star.vx *= 0.95;
        star.vy *= 0.95;
        star.vx = Math.max(-2, Math.min(2, star.vx));
        star.vy = Math.max(-2, Math.min(2, star.vy));

        // Update position
        star.x += star.vx;
        star.y += star.vy;

        // Bounce off edges
        if (star.x < 0 || star.x > width) star.vx *= -1;
        if (star.y < 0 || star.y > height) star.vy *= -1;

        star.x = Math.max(0, Math.min(width, star.x));
        star.y = Math.max(0, Math.min(height, star.y));

        // Draw star as bright cyan point
        ctx.fillStyle = `rgba(0, 212, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect for brighter stars
        if (star.opacity > 0.6) {
          ctx.fillStyle = `rgba(0, 212, 255, ${star.opacity * 0.3})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw nebula-like particles connecting to mouse
      if (!isMobileRef.current && mousePos.x && mousePos.y) {
        const nearbyStars = starsRef.current.filter((s) => {
          const dx = mousePos.x - s.x;
          const dy = mousePos.y - s.y;
          return Math.sqrt(dx * dx + dy * dy) < 150;
        });

        for (let i = 0; i < nearbyStars.length; i++) {
          for (let j = i + 1; j < nearbyStars.length; j++) {
            const dx = nearbyStars[i].x - nearbyStars[j].x;
            const dy = nearbyStars[i].y - nearbyStars[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 80) {
              ctx.strokeStyle = `rgba(0, 212, 255, ${
                (1 - distance / 80) * 0.2 * (nearbyStars[i].opacity + nearbyStars[j].opacity) / 2
              })`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(nearbyStars[i].x, nearbyStars[i].y);
              ctx.lineTo(nearbyStars[j].x, nearbyStars[j].y);
              ctx.stroke();
            }
          }
        }
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
      initStars();
      initConstellations();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  // Handle mouse move
  useEffect(() => {
    if (shouldReduceMotion || isMobileRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-screen w-screen"
      style={{
        background: '#000000',
      }}
    />
  );
};
