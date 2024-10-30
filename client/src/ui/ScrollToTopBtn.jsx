import { useState, useEffect } from "react";
import ArrowUp from "../assets/svg/arrowup.svg?react";
import { motion } from "framer-motion";

const ScrollToTopBtn = ({ scrollRef }) => {
  const [isVisible, setIsVisible] = useState(false);

  const buttonVariants = {
    initial: {
      scale: 0,
    },

    enter: {
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.3,
        stiffness: 200,
      },
    },

    leave: {
      scale: 0,
      transition: {
        duration: 0.2,
        type: "tween",
      },
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current.scrollTop > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Attach the scroll event listener to the ref element
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    // Clean up the event listener on component unmount
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollRef]);

  const handleClick = () => {
    scrollRef.current.scrollTo(0, 0);
  };

  //   if (!isVisible) return null;

  return (
    <motion.button
      className="fixed right-10 bottom-10 rounded-full p-3 bg-[var(--primary)]"
      variants={buttonVariants}
      initial="initial"
      animate={isVisible ? "enter" : "leave"}
      onClick={handleClick}
    >
      <ArrowUp className="fill-[var(--on-primary)] h-10 w-10" />
    </motion.button>
  );
};

export default ScrollToTopBtn;
