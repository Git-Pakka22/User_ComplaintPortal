import { motion } from "framer-motion";

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 40,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -40,
      }}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
      }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;