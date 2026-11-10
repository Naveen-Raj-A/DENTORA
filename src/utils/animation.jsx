import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll-triggered reveal wrapper.
 * Usage: <ScrollReveal><.../></ScrollReveal>
 */
export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 24,
  once = true,
  className = "",
  style,
  as: Tag = "div",
}) {
  const reduce = useReducedMotion();
  const offsets = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };
  const from = offsets[direction] || offsets.up;

  if (reduce) {
    return <Tag className={className} style={style}>{children}</Tag>;
  }

  const MotionTag = motion[Tag] || motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
