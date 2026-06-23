"use client";

import { motion } from "framer-motion";

const text = "LINDA SOMIARI-STEWART";

const AnimatedTitle = () => {
  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.1 } },
  };

  return (
    <div className="relative z-10 max-w-7xl w-full text-center text-white">
      <motion.h1
        className="lg:text-3xl text-[20px] font-bold flex justify-center flex-wrap"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {letters.map((char, index) => (
          <motion.span key={index} variants={child} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

export default AnimatedTitle;
