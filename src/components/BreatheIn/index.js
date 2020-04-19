import React, { useEffect } from "react";
import { motion } from "framer-motion";

import BreatheInIcon from "../../img/breath.svg";
import BreatheInSound from "../../sounds/breathe_in.mp3";

export default function BreatheIn(props) {
  const audio = new Audio(BreatheInSound);

  useEffect(() => {
    audio.play();
  }, []);

  return (
    <div>
      <motion.div
        style={{
          width: "100px",
          height: "50px",
        }}
        animate={{ scale: [1, 1.2, 1.5] }}
        transition={{
          duration: props.duration,
        }}
      >
        <img src={BreatheInIcon} alt="icon" />
      </motion.div>
    </div>
  );
}
