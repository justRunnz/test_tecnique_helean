import React from "react";
import {motion} from "framer-motion";

function AnimatedDiv({children, delay, className}) {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{delay: delay}}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedDiv;
