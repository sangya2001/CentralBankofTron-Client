import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import "./style.css";

import { initContract } from "../../Utils/Utils";
import Loading from "../../Components/Loading";

export default function Dashboard() {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    initContract().then((contract) => {
      setContract(contract);
    });
  }, []);
  return (
    <div className="dashboard">
      {contract ? (
        <div>
          <Navbar />

          {/* wallet info */}
          <div className="topBar">
            <div className="walletAddress">
              <b>Your Address</b>: 0x0jsbdv78sdvb345jVG7
            </div>
            <div className="walletBalance">
              <Button>Recharge ROI</Button>
              <b>Your Balance</b>: 456,930 TRX
            </div>
          </div>
          <hr />

          <div className="scrollableZone">
            {/* universal data */}
            <div className="universalData">
              <div className="totalInvestors">
                <h2>
                  Total Investors
                  <br />
                  <span style={{ fontSize: "30px", color: "#5a5a5a" }}>
                    12345567 TRX
                  </span>
                </h2>
              </div>
              <div className="totalInvestment">
                <h2>
                  Total Investment
                  <br />
                  <span style={{ fontSize: "30px", color: "#5a5a5a" }}>
                    9656745 TRX
                  </span>
                </h2>
              </div>
              <div className="totalReferralBonus">
                <h2>
                  Total Referral Bonus
                  <br />
                  <span style={{ fontSize: "30px", color: "#5a5a5a" }}>
                    09868756 TRX
                  </span>
                </h2>
              </div>
            </div>

            <hr />

            {/* asset */}
            <div className="assetInfo">
              <h1>Asset Info</h1>
              <div className="flexData">
                <div className="totalInvestors">
                  <h2>
                    Compound Asset
                    <br />
                    <span style={{ fontSize: "30px", color: "#5a5a5a" }}>
                      12345567 TRX
                    </span>
                  </h2>
                </div>
                <div className="totalInvestment">
                  <h2>
                    Dividend
                    <br />
                    <span style={{ fontSize: "30px", color: "#5a5a5a" }}>
                      9656745 TRX
                    </span>
                  </h2>
                </div>
                <div className="totalReferralBonus">
                  <h2>
                    Withdrawble After
                    <br />
                    <span style={{ fontSize: "30px", color: "#5a5a5a" }}>
                      86400 Seconds
                    </span>
                  </h2>
                </div>
              </div>
            </div>

            <hr />

            {/* referral info */}
            <div className="referralInfo">
              <h1>Referral Info</h1>
              <div className="flexData">
                <div>
                  <h2>
                    Referral Level
                    <br />
                    <span style={{ fontSize: "15px", color: "#5a5a5a" }}>
                      1. oxo3456434567dvrt
                      <br />
                      2. oxo3456434567dvrt
                      <br />
                      3. oxo3456434567dvrt
                    </span>
                  </h2>
                </div>
                <div>
                  <h2>
                    <span style={{ fontSize: "30px", color: "#5a5a5a" }}>
                      9656745 TRX
                    </span>
                  </h2>
                  <Button>Claim Bonus</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
