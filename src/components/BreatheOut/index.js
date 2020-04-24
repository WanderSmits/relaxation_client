import React, { useEffect } from "react";
import { motion } from "framer-motion";

import BreatheInIcon from "../../img/breath.svg";
import BreatheOutSound from "../../sounds/breathe_out.mp3";

export default function BreatheIn(props) {
  const audio = new Audio(BreatheOutSound);

  useEffect(() => {
    audio.play();
    audio.volume = 0.5;
  }, []);

  return (
    <motion.div
      style={{
        width: "100px",
        height: "50px",
      }}
      animate={{ scale: [1.5, 1.2, 1] }}
      transition={{
        duration: props.duration,
      }}
    >
      <img src={BreatheInIcon} alt="icon" />
    </motion.div>
  );
}
