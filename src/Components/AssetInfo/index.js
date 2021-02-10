import React, { useState, useEffect } from 'react'


export default function AssetInfo({ contract }) {
    const [totalInvestment, setTotalInvestment] = useState("0");
    const [initialInvestment, setInitialInvestment] = useState("0");
    const [dividendEarned, setDividendEarned] = useState("0");

    useEffect(() => {
        window.tronWeb.trx
            .getAccount()
            .then((data) => {
                contract && contract
                    .users(window.tronWeb.address.fromHex(data.address))
                    .call()
                    .then((data) => {
                        setTotalInvestment(window.tronWeb.toDecimal(data.totalInvestment));
                    })

                contract && contract
                    .users(window.tronWeb.address.fromHex(data.address))
                    .call()
                    .then((data) => {
                        setInitialInvestment(window.tronWeb.toDecimal(data.initialInvestment));
                    })

                contract && contract
                    .users(window.tronWeb.address.fromHex(data.address))
                    .call()
                    .then((data) => {
                        var ROI = (data.totalInvestment * 7) / 100;
                        var ROIPerSecond = ROI / 86400;

                        var timeElapsed = Math.round(Date.now() / 1000) - (window.tronWeb.toDecimal(data.withdrawableAt) - 86400);
                        setDividendEarned((timeElapsed * ROIPerSecond).toFixed(2));
                    })
            }
            );
    }, [contract]);

    return (
        <div className="assetInfo">
            <h1 style={{ margin: "40px 0" }}>Asset Info</h1>
            <div className="flexData">
                {/* total investment */}
                <div className="totalInvestors">
                    <h2>
                        Initial Investment
                        <br />
                        <span style={{ fontSize: "30px", color: "#5a5a5a" }}>
                            {initialInvestment / 1000000} TRX
                        </span>
                    </h2>
                </div>

                <div className="totalInvestors">
                    <h2>
                        Compound Investment
                        <br />
                        <span style={{ fontSize: "30px", color: "#5a5a5a" }}>
                            {
                                (totalInvestment / 1000000).toFixed(2)
                            } TRX
                        </span>
                    </h2>
                </div>

                {/* dividend is calculated automatically */}
                <div className="totalInvestment">
                    <h2>
                        Dividend Earned
                        <br />
                        <span style={{ fontSize: "30px", color: "#5a5a5a" }}>
                            {(dividendEarned / 1000000).toFixed(2)} TRX
                        </span>
                    </h2>
                </div>
            </div>
        </div>
    )
}
