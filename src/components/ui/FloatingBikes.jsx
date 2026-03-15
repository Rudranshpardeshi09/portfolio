import { useState, useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import useThemeStore, { BIKE_THEMES } from "../../store/themeStore";

const ARC_RADIUS = 120;
const ARC_SPREAD = 70;

export default function CurvedArcThemeSelector() {

  const { theme, setBike } = useThemeStore();
  const [expanded, setExpanded] = useState(false);

  const bikeRefs = useRef([]);
  const trailRefs = useRef([]);
  const mainBtnRef = useRef(null);
  const particlesRef = useRef(null);

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

  /* -----------------------------
     CURVED ARC EXPANSION
  ----------------------------- */

  useEffect(() => {

    otherThemes.forEach((t, index) => {

      const bike = bikeRefs.current[index];
      const trail = trailRefs.current[index];

      if (!bike) return;

      if (expanded) {

        const angle =
          (-ARC_SPREAD / 2 + (ARC_SPREAD / (otherThemes.length - 1)) * index) *
          (Math.PI / 180);

        const x = Math.cos(angle) * ARC_RADIUS;
        const y = Math.sin(angle) * ARC_RADIUS * -1;

        gsap.fromTo(
          bike,
          {
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0.3
          },
          {
            x,
            y,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: index * 0.05
          }
        );

        gsap.fromTo(
          trail,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.4,
            delay: index * 0.05,
            ease: "power2.out"
          }
        );

      } else {

        gsap.to(bike, {
          x: 0,
          y: 0,
          opacity: 0,
          scale: 0.3,
          duration: 0.3
        });

        gsap.to(trail, {
          scaleX: 0,
          duration: 0.2
        });

      }

    });

  }, [expanded]);

  /* -----------------------------
     THEME SELECT
  ----------------------------- */

  const handleThemeSelect = (t) => {

    setBike(t.id);
    setExpanded(false);
    triggerBurst(t.primaryRgb);

  };

  /* -----------------------------
     PARTICLE BURST
  ----------------------------- */

  const triggerBurst = (rgb) => {

    if (!particlesRef.current) return;

    const fragments = Array.from({ length: 14 }).map(() => {

      const el = document.createElement("div");

      el.className = "absolute w-2 h-2 rounded-full";
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
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => frag.remove()
      });

    });

  };

  /* -----------------------------
     RENDER
  ----------------------------- */

  return (

    <div
      className="fixed bottom-16 left-6 z-50 pointer-events-none"
      style={{ width: 80, height: 80 }}
    >

      <div
        ref={particlesRef}
        className="absolute inset-0 flex items-center justify-center"
      />

      {/* neon trails */}

      {otherThemes.map((t, index) => (

        <div
          key={`trail-${t.id}`}
          ref={(el) => (trailRefs.current[index] = el)}
          className="absolute h-[3px] origin-left rounded-full"
          style={{
            width: ARC_RADIUS,
            left: 32,
            top: 32,
            transform: "scaleX(0)",
            background: `linear-gradient(90deg, rgba(${t.primaryRgb},0.8), transparent)`
          }}
        />

      ))}

      {/* bikes */}

      {otherThemes.map((t, index) => (

        <button
          key={t.id}
          ref={(el) => (bikeRefs.current[index] = el)}
          onClick={() => handleThemeSelect(t)}
          className="absolute flex items-center justify-center
          w-12 h-12 rounded-full pointer-events-auto
          shadow-xl hover:scale-110 backdrop-blur-md"
          style={{
            background: `linear-gradient(135deg, ${t.gradientStart}, ${t.gradientEnd})`,
            border: `2px solid ${t.primary}`,
            opacity: 0
          }}
        >

          <img
            src={t.image}
            alt={t.name}
            className="w-9 h-9 object-contain"
          />

        </button>

      ))}

      {/* main selector */}

      <button
        ref={mainBtnRef}
        onClick={() => setExpanded(!expanded)}
        className="absolute w-16 h-16 rounded-full
        flex items-center justify-center
        pointer-events-auto shadow-xl hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${selectedTheme.gradientStart}, ${selectedTheme.gradientEnd})`,
          border: `2px solid ${selectedTheme.primary}`,
          boxShadow: `0 0 20px rgba(${selectedTheme.primaryRgb},0.7)`
        }}
      >

        <img
          src={selectedTheme.image}
          alt="current theme"
          className="w-11 h-11 object-contain"
        />

      </button>

    </div>

  );

}