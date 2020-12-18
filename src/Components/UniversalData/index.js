import React, { useState, useEffect } from 'react'

export default function UniversalData({ contract }) {
    const [totalInvestor, setTotalInvestor] = useState("0");
    const [totalInvestment, setTotalInvestment] = useState("0");
    const [totalReferralBonus, setTotalReferralBonus] = useState("0");

    useEffect(() => {
        contract
            .totalInvestors()
            .call()
            .then((data) => setTotalInvestor(window.tronWeb.toDecimal(data)));
        contract
            .totalInvestment()
            .call()
            .then((data) => setTotalInvestment(window.tronWeb.toDecimal(data)));
        contract
            .totalReferralBonus()
            .call()
            .then((data) => setTotalReferralBonus(window.tronWeb.toDecimal(data)));
    }, [contract])
    return (
        <div className="universalData">
            <div className="totalInvestors">
                <h2>
                    Total Investors
                  <br />
                    <span style={{ fontSize: "30px", color: "#5a5a5a" }}>
                        {totalInvestor}
                    </span>
                </h2>
            </div>
            <div className="totalInvestment">
                <h2>
                    Total Investment
                  <br />
                    <span style={{ fontSize: "30px", color: "#5a5a5a" }}>
                        {totalInvestment / 10 ** 6} TRX
                  </span>
                </h2>
            </div>
            <div className="totalReferralBonus">
                <h2>
                    Total Referral Bonus
                  <br />
                    <span style={{ fontSize: "30px", color: "#5a5a5a" }}>
                        {totalReferralBonus / 10 ** 6} TRX
                  </span>
                </h2>
            </div>
        </div>
    )
}
