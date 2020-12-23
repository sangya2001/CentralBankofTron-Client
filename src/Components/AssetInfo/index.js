import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react'


export default function AssetInfo({ contract, setIsLoading }) {
    const [compoundAsset, setCompoundAsset] = useState("0");
    const [dividend, setDividend] = useState("0");
    const [withdrawableAt, setWithdrawableAt] = useState("0");
    const [userAddress, setUserAddress] = useState('');
    const [withdrawableAfterInitialInvestment, setWithdrawableAfterInitialInvestment] = useState('');

    useEffect(() => {

        axios.get(`http://localhost:8000/api/getByuserAddress/${userAddress}`).then((response) =>{
            setWithdrawableAfterInitialInvestment(response.data.canWithdrawAt);
        });
        window.tronWeb.trx
            .getAccount()
            .then((data) => {
                setUserAddress(window.tronWeb.address.fromHex(data.address));
                contract && contract
                    .users(window.tronWeb.address.fromHex(data.address || data.__payload__.address))
                    .call()
                    .then((data) => {
                        setCompoundAsset(window.tronWeb.toDecimal(data.compoundAsset));
                    })
                contract && contract
                    .users(window.tronWeb.address.fromHex(data.address || data.__payload__.address))
                    .call()
                    .then((data) => {
                        setDividend(window.tronWeb.toDecimal(data.dividend));
                    })
                contract && contract
                    .users(window.tronWeb.address.fromHex(data.address || data.__payload__.address))
                    .call()
                    .then((data) => {
                        setWithdrawableAt(window.tronWeb.toDecimal(data.withdrawableAt - Math.round(Date.now() / 1000)));
                    })
            }
            );
    }, [contract])


    const sendWithdrawTime = () =>{
        const time = Date.now() + 86400000;

        let Data = {
            user_id : userAddress,
            dividend: dividend,
            canWithdrawAt: time,
        };
        axios.post('http://localhost:8000/api/setWithdrawTime', Data)
        .then((response) => console.log(response));  
        
    }

    return (
        <div className="assetInfo">
            <h1 style={{ margin: "40px 0" }}>Asset Info</h1>
            <div className="flexData">
                <div className="totalInvestors">
                    <h2>
                        Compound Asset
                        <br />
                        <span style={{ fontSize: "30px", color: "#5a5a5a" }}>
                            {compoundAsset / 1000000} TRX
                        </span>
                    </h2>
                </div>
                <div className="totalInvestment">
                    <h2>
                        Dividend
                        <br />
                        <span style={{ fontSize: "30px", color: "#5a5a5a" }}>
                            {dividend / 1000000} TRX
                        </span>
                    </h2>
                </div>
                <div className="totalReferralBonus">
                    <h2>
                        Withdrawble
                        <br />
                        <span style={{ fontSize: "30px", color: "#5a5a5a" }}>
                            {
                                withdrawableAt > 0 && <div>{(withdrawableAt / 3600).toFixed(2)} Hours</div>
                            }
                            {
                                withdrawableAt <= 0 && <Button onClick={() => {
                                    // contract.withdrawAndReinvest().send().then(() => {});
                                    setIsLoading(true);
                                    sendWithdrawTime();
                                    // setTimeout(() => {window.location.reload()}, 13000);
                                }}>Withdraw Dividend</Button>
                            }
                        </span>
                    </h2>
                </div>
            </div>
        </div>
    )
}
