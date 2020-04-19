import React from "react";
import { motion } from "framer-motion";

import useSound from "use-sound";

import BreatheInIcon from "../../img/breath.svg";
import BreatheInSound from "../../sounds/breathe_in_sound.wav";

export default function BreatheIn(props) {
  const [play] = useSound(BreatheInSound);

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
