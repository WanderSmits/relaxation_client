import React from "react";
import { motion } from "framer-motion";

import BreatheInIcon from "../../img/breath.svg";

export default function BreatheIn(props) {
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
      <img src={BreatheInIcon} alt="Icon" />
    </motion.div>
  );
}
