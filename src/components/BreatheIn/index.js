import React from "react";
import { motion } from "framer-motion";

import BreatheInIcon from "../../img/breath.svg";

export default function BreatheIn() {
  return (
    <motion.div
      style={{
        width: "100px",
        height: "50px",
      }}
      animate={{ scale: [1, 1.2, 1.5] }}
      transition={{
        duration: 5,
      }}
    >
      <img src={BreatheInIcon} />
    </motion.div>
  );
}
