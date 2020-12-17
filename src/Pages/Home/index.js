import React from "react";
import { motion } from "framer-motion";
import "./style.css";

// components
import Navbar from "../../Components/Navbar";
import Landing from "../../Components/Landing";
import ReferralBonus from "../../Components/ReferralBonus";

export default function Home() {
  return (
    <motion.div className="dummyHome">
      <Navbar page="home"/>
      <div className="dummyBody">
        <Landing />

        <ReferralBonus/>
      </div>
    </motion.div>
  );
}
