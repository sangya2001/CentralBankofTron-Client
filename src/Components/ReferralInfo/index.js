import React, { useEffect, useState } from 'react'
import { Button } from "@material-ui/core";

export default function ReferralInfo({ contract, setIsLoading }) {
    const [referralBonus, setReferralBonus] = useState('');
    const [referralLevelOne, setReferralLevelOne] = useState('');
    const [referralLevelTwo, setReferralLevelTwo] = useState('');
    const [referralLevelThree, setReferralLevelThree] = useState('');
    const [noReferral, setNoReferral] = useState(false);

    useEffect(() => {
        window.tronWeb.trx
            .getAccount()
            .then((data) => {
                // setting the referral levels
                // get ref one
                    contract && contract.referralLevelCount(window.tronWeb.address
                        .fromHex(data.address), 1)
                        .call()
                        .then(res => {
                            setNoReferral(res);
                            
                            if(res) {
                                contract.referralLevel(window.tronWeb.address
                                    .fromHex(data.address), 1)
                                    .call()
                                    .then(res => setReferralLevelOne(window.tronWeb.address.fromHex(res)));
                            }
                        });
                
                    // get ref two
                    contract && contract.referralLevelCount(window.tronWeb.address
                        .fromHex(data.address), 2)
                        .call()
                        .then(res => {
                            if(res) {
                                contract.referralLevel(window.tronWeb.address
                                    .fromHex(data.address), 2)
                                    .call()
                                    .then(res => setReferralLevelTwo(window.tronWeb.address.fromHex(res)));
                            }
                        });
                    
                    // get ref three
                    contract && contract.referralLevelCount(window.tronWeb.address
                        .fromHex(data.address), 3)
                        .call()
                        .then(res => {
                            if(res) {
                                contract.referralLevel(window.tronWeb.address
                                    .fromHex(data.address), 3)
                                    .call()
                                    .then(res => setReferralLevelThree(window.tronWeb.address.fromHex(res)));
                            }
                        });

                    // setting the referral bonus
                    contract && contract
                    .referralBonus(window.tronWeb.address.fromHex(data.address))
                    .call()
                    .then(res => setReferralBonus(window.tronWeb.toDecimal(res)))
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
                    {
                        noReferral ?
                        <span style={{ color: "#5a5a5a", fontSize: "18px"}}>
                            {referralLevelOne && <div>1. {referralLevelOne}</div>}
                            <br />
                            {referralLevelTwo && <div>2. {referralLevelTwo}</div>}
                            <br />
                            {referralLevelThree && <div>3. {referralLevelThree}</div>}
                        </span>
                        : <span style={{ color: "#5a5a5a"}}>You don't have any referrer.</span>
                    }
                </div>
                <div style={{padding: "0 150px 20px 150px"}}>
                    <h2>
                        <span style={{ fontSize: "30px", color: "#5a5a5a", margin: "0" }}>
                            {referralBonus/1000000} TRX
                        </span>
                    </h2>
                    <Button onClick={() => 
                        {
                            setIsLoading(true)
                            contract.claimReferralBonus()
                            .send()
                            .then(() => {
                                console.log("Bonus Claimed!"); 
                                setTimeout(() => {window.location.reload()}, 30000);
                            })
                        }} 
                        
                        disabled={referralBonus <= 0 && true}>
                            Claim Bonus
                    </Button>
                </div>
            </div>
        </div >
    )
}
