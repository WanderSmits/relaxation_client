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
      animate={{ scale: [1.5, 1.2, 1] }}
      transition={{
        duration: 5,
      }}
    >
      <img src={BreatheInIcon} />
    </motion.div>
  );
}
