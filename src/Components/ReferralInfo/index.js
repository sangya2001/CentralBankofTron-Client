import React, { useEffect, useState } from 'react'
import { Button } from "@material-ui/core";

export default function ReferralInfo({ contract, setIsLoading }) {
    const [referralBonus, setReferralBonus] = useState('');
    const [referralLevelOne, setReferralLevelOne] = useState('');
    const [referralLevelTwo, setreferralLevelTwo] = useState('');
    const [referralLevelThree, setreferralLevelThree] = useState('');

    useEffect(() => {
        contract && contract.getReferralBonus().call().then(res => {
            setReferralBonus(window.tronWeb.toDecimal(res._hex));
        })
        contract && contract.getFirstLevelReferral().call().then(res => {
            console.log(typeof (res));
            res && setReferralLevelOne(res);
        })
        contract && contract.getSecondLevelReferral().call().then(res => {
            console.log(typeof (res));
            res && setreferralLevelTwo(res);
        })
        contract && contract.getThirdLevelReferral().call().then(res => {
            console.log(typeof (res));
            res && setreferralLevelThree(res);
        })
    }, [contract])
    return (
        <div className="referralInfo">
            <h1  style={{margin: "40px 0"}}>Referral Info</h1>
            <div className="flexData">
                <div>
                    <h2>
                        Referral Level
                        
                    </h2>
                    <span style={{ color: "#5a5a5a", fontSize: "18px"}}>
                            {referralLevelOne && <div>1. {referralLevelOne}</div>}
                            <br />
                            {referralLevelTwo && <div>2. {referralLevelTwo}</div>}
                            <br />
                            {referralLevelThree && <div>3. {referralLevelThree}</div>}
                        </span>
                </div>
                <div style={{padding: "0 150px 20px 150px"}}>
                    <h2>
                        <span style={{ fontSize: "30px", color: "#5a5a5a", margin: "0" }}>
                            {referralBonus/1000000} TRX
                </span>
                    </h2>
                    <Button onClick={() => 
                        {contract.claimReferralBonus()
                        .send()
                        .then((res) => {
                            console.log("Bonus Claimed!"); 
                        })

                        setIsLoading(true)
                        setTimeout(() => {window.location.reload()}, 60000);
                    }} 
                        
                        disabled={referralBonus <= 0 && true}>
                            Claim Bonus
                    </Button>
                </div>
            </div>
        </div >
    )
}
