import { useState, useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import useThemeStore, { BIKE_THEMES } from "../../store/themeStore";

const FLOAT_AMPLITUDE = 35;
const FLOAT_FREQUENCY = 1.2;
const ITEM_SPACING = 65;

export default function FloatingBikes() {
  const { theme, setBike } = useThemeStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const containerRef = useRef(null);
  const particlesRef = useRef(null);
  const mainBtnRef = useRef(null);
  const bikeRefs = useRef([]);
  const floatingAnims = useRef([]);

  // Convert themes object → array
  const themes = useMemo(
    () =>
      Object.keys(BIKE_THEMES).map((key) => ({
        id: key,
        ...BIKE_THEMES[key],
      })),
    []
  );

  const selectedTheme = useMemo(
    () => themes.find((t) => t.id === theme.key) || themes[0],
    [themes, theme.key]
  );

  const otherThemes = useMemo(
    () => themes.filter((t) => t.id !== selectedTheme.id),
    [themes, selectedTheme.id]
  );

  /**
   * Theme Selection
   */
  const handleThemeSelect = (newTheme) => {
    setBike(newTheme.id);
    setIsExpanded(false);
    triggerBurst(newTheme.primaryRgb);
  };

  /**
   * Expand / Collapse Animations
   */
  useEffect(() => {
    floatingAnims.current.forEach((a) => a.kill());
    floatingAnims.current = [];

    otherThemes.forEach((_, index) => {
      const el = bikeRefs.current[index];
      if (!el) return;

      if (isExpanded) {
        const xOffset =
          Math.abs(Math.sin((index + 1) * FLOAT_FREQUENCY) * FLOAT_AMPLITUDE) +
          10;
        const yOffset = -(index + 1) * ITEM_SPACING;

        gsap.to(el, {
          x: xOffset,
          y: yOffset,
          rotationZ: Math.cos((index + 1) * FLOAT_FREQUENCY) * 15,
          scale: 1,
          opacity: 1,
          duration: 0.55,
          ease: "back.out(1.6)",
          delay: index * 0.05,
          onComplete: () => {
            const float = gsap.to(el, {
              y: `+=${5 + Math.random() * 5}`,
              x: `+=${Math.random() * 4 - 2}`,
              duration: 1.5 + Math.random(),
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
            });
            floatingAnims.current.push(float);
          },
        });
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          rotationZ: 0,
          scale: 0.5,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        });
      }
    });

    gsap.to(mainBtnRef.current, {
      rotation: isExpanded ? 15 : 0,
      scale: isExpanded ? 0.9 : 1,
      duration: 0.35,
    });
  }, [isExpanded, otherThemes]);

  /**
   * Idle Floating Animation
   */
  useEffect(() => {
    if (isExpanded) return;

    const bob = gsap.to(containerRef.current, {
      y: "-=8",
      duration: 1.6,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    return () => bob.kill();
  }, [isExpanded]);

  /**
   * Particle Burst
   */
  const triggerBurst = (rgb) => {
    if (!particlesRef.current) return;

    const fragments = Array.from({ length: 12 }).map(() => {
      const el = document.createElement("div");
      el.className =
        "absolute w-2 h-2 rounded-full pointer-events-none";
      el.style.background = `rgb(${rgb})`;
      el.style.left = "50%";
      el.style.top = "50%";
      particlesRef.current.appendChild(el);
      return el;
    });

    fragments.forEach((frag, i) => {
      const angle = (i / fragments.length) * Math.PI * 2;
      const dist = 40 + Math.random() * 40;

      gsap.to(frag, {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        opacity: 0,
        scale: 0,
        duration: 0.6 + Math.random() * 0.4,
        ease: "power2.out",
        onComplete: () => frag.remove(),
      });
    });
  };

  return (
    <div
      className="fixed bottom-6 left-6 z-50 pointer-events-none"
      style={{ width: 64, height: 64 }}
    >
      <div
        ref={particlesRef}
        className="absolute inset-0 flex items-center justify-center"
      />

      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Theme Options */}
        {otherThemes.map((t, index) => (
          <button
            key={t.id}
            ref={(el) => (bikeRefs.current[index] = el)}
            onClick={() => handleThemeSelect(t)}
            aria-label={`Switch to ${t.name}`}
            className="absolute flex items-center justify-center
            w-12 h-12 rounded-full shadow-lg backdrop-blur-md
            transition-transform duration-200 hover:scale-110
            pointer-events-auto"
            style={{
              background: `linear-gradient(135deg, ${t.gradientStart}, ${t.gradientEnd})`,
              border: `2px solid ${t.primary}`,
              opacity: 0,
              scale: 0.5,
              zIndex: 40 - index,
            }}
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-10 h-10 object-contain drop-shadow-md"
            />
          </button>
        ))}

        {/* Main Toggle */}
        <button
          ref={mainBtnRef}
          onClick={() => setIsExpanded((p) => !p)}
          aria-label="Toggle bike themes"
          className="absolute z-50 w-16 h-16 rounded-full
          flex items-center justify-center
          backdrop-blur-md shadow-xl
          transition-transform duration-200
          hover:scale-105 active:scale-95
          pointer-events-auto"
          style={{
            background: `linear-gradient(135deg, ${selectedTheme.gradientStart}, ${selectedTheme.gradientEnd})`,
            border: `2px solid ${selectedTheme.primary}`,
            boxShadow: `0 0 20px rgba(${selectedTheme.primaryRgb},0.5)`,
          }}
        >
          <img
            src={selectedTheme.image}
            alt="Current bike theme"
            className="w-12 h-12 object-contain drop-shadow-xl transition-transform group-hover:scale-110"
          />
        </button>
      </div>
    </div>
  );
}