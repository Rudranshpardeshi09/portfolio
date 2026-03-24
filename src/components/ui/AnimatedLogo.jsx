import { motion } from 'framer-motion';

const MotionDiv = motion.div;
const MotionImg = motion.img;

function getAnimationSeed(value) {
    return Array.from(value).reduce((total, char) => total + char.charCodeAt(0), 0);
}

export default function AnimatedLogo({ src, alt, theme }) {
    const seed = getAnimationSeed(alt);
    const orbitDuration = 10 + (seed % 4) * 1.25;
    const driftDuration = 5.5 + (seed % 5) * 0.35;
    const driftOffset = 4 + (seed % 4);
    const tiltOffset = (seed % 5) - 2;
    const sweepDelay = (seed % 6) * 0.3;
    const direction = seed % 2 === 0 ? 1 : -1;

    return (
        <div className="flex flex-col items-center">
            <MotionDiv
                animate={{
                    y: [0, -driftOffset, 0, driftOffset * 0.35, 0],
                    rotateX: [tiltOffset * 0.35, tiltOffset * -0.2, tiltOffset * 0.35],
                    rotateY: [tiltOffset * -0.45, tiltOffset * 0.35, tiltOffset * -0.45],
                }}
                transition={{
                    duration: driftDuration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                whileHover={{
                    y: -6,
                    rotateX: -6,
                    rotateY: 8 * direction,
                    scale: 1.05,
                    transition: { type: 'spring', stiffness: 280, damping: 18 },
                }}
                className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.35rem] border md:h-20 md:w-20"
                style={{
                    transformStyle: 'preserve-3d',
                    borderColor: `rgba(${theme.primaryRgb}, 0.16)`,
                    background: 'linear-gradient(160deg, rgba(10,14,18,0.96), rgba(24,31,40,0.88))',
                    boxShadow: `0 16px 34px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 20px rgba(${theme.primaryRgb}, 0.05)`,
                }}
            >
                <div
                    aria-hidden="true"
                    className="absolute inset-[5px] rounded-[1rem]"
                    style={{
                        border: '1px solid rgba(255,255,255,0.06)',
                        background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.08), transparent 36%), radial-gradient(circle at 70% 75%, rgba(${theme.primaryRgb},0.10), transparent 42%)`,
                    }}
                />

                <MotionDiv
                    aria-hidden="true"
                    animate={{ rotate: direction * 360 }}
                    transition={{ duration: orbitDuration, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-[8px] rounded-full"
                    style={{
                        border: `1px solid rgba(${theme.primaryRgb}, 0.18)`,
                        opacity: 0.55,
                    }}
                >
                    <span
                        className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                            background: theme.primary,
                            boxShadow: `0 0 10px rgba(${theme.primaryRgb}, 0.8)`,
                        }}
                    />
                </MotionDiv>

                <MotionDiv
                    aria-hidden="true"
                    animate={{ rotate: direction * -360 }}
                    transition={{ duration: orbitDuration * 1.6, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-[13px] rounded-full opacity-60"
                    style={{
                        border: `1px dashed rgba(${theme.primaryRgb}, 0.28)`,
                    }}
                />

                <MotionDiv
                    aria-hidden="true"
                    animate={{ x: ['-130%', '130%'] }}
                    transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        repeatDelay: 2.2,
                        ease: 'easeInOut',
                        delay: sweepDelay,
                    }}
                    className="absolute inset-y-0 w-10 rotate-[18deg] opacity-40"
                    style={{
                        background: `linear-gradient(180deg, transparent, rgba(255,255,255,0.42), transparent)`,
                        filter: 'blur(8px)',
                    }}
                />

                <div
                    className="absolute inset-0 rounded-[1.35rem] opacity-80"
                    style={{
                        background: `radial-gradient(circle at 50% 18%, rgba(${theme.primaryRgb},0.10), transparent 50%), radial-gradient(circle at 50% 84%, rgba(255,255,255,0.06), transparent 38%)`,
                    }}
                />

                <MotionImg
                    src={src}
                    alt={alt}
                    className="relative z-20 h-10 w-10 object-contain md:h-12 md:w-12"
                    animate={{
                        rotateZ: [0, direction * 1.5, 0],
                        scale: [1, 1.02, 1],
                    }}
                    transition={{
                        duration: driftDuration + 1.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    whileHover={{
                        scale: 1.06,
                        rotateZ: direction * 4,
                        transition: { type: 'spring', stiffness: 260, damping: 18 },
                    }}
                    style={{
                        filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.32))',
                    }}
                />

                <div
                    aria-hidden="true"
                    className="absolute bottom-2 h-2 w-10 rounded-full blur-md md:w-12"
                    style={{
                        background: `radial-gradient(circle, rgba(${theme.primaryRgb},0.28), transparent 72%)`,
                    }}
                />
            </MotionDiv>
        </div>
    );
}
