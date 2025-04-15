export const wrapperAnimation = {
  hidden: {
    y: "-100vH",
    x: "10px",
  },
  visible: {
    y: "0px",
    x: "0px",
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 300,
      delay: 0.1,
    },
  },
  exit: {
    y: "-100vH",
    x: "10px",
    transition: {
      duration: 0.3,
    },
  },
};

export const fullscreenAnimation = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
};
