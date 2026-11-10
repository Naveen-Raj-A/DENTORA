import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export const PageTransition = ({ children }) => {
  const location = useLocation();
  const { reducedMotion } = useReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
