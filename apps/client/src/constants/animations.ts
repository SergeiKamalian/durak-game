export const wrapperAnimation = {
  hidden: {
    y: "-30px",
    x: "0px",
    opacity: 0,
  },
  visible: {
    y: "0px",
    x: "0px",
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.1,
    },
  },
  exit: {
    y: "-100vH",
    x: "10px",
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
