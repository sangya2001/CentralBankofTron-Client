import React from "react";
import "./style.css";
import LoadingAnimation from "../../Assets/Loading.svg";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="loading"
    >
      <img
        className="loadingAnimator"
        src={LoadingAnimation}
        alt="Loading Animation"
      />
    </motion.div>
  );
}
