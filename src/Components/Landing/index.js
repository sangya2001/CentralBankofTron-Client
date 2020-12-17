import React from "react";
import "./style.css";
import {Link} from 'react-router-dom'

export default function Landing() {
  return (
    <div className="landing">
      <div className="left"></div>
      <div className="right">
        <h1>
          Get <span style={{color: "#fed330"}}>7% Daily ROI</span> on Compound Asset, <br />
          The most <span style={{color: "#26de81"}}>promising dividend</span> ever paid on TRON Network.
        </h1>
        <Link to="/dashboard" className="investNow">START INVESTING</Link><br/>
        <br/>Note: Each second counts, invest now!
      </div>
    </div>
  );
}
