import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function ReferralBonus() {
  return (
    <div className="referralBonus">
      <div className="left">
          <h1>
              We present you, the <span style={{color: "#26DE81"}}>best referral service</span> rewarded with high amount as a bonus.
          </h1>
          <Link to="/dashboard" className="referNow">REFER NOW</Link>
      </div>
      <div className="right"></div>
    </div>
  );
}
