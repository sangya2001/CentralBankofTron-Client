import React, { useState, useEffect } from 'react'
import { Button } from "@material-ui/core";
import { CopyToClipboard } from 'react-copy-to-clipboard';


export default function Topbar({ contract, setIsLoading }) {
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("0");
    const [Copied, setCopied] = useState(false);
    const [referralURL, setReferralURL] = useState('');
    const [canWithdraw, setCanWithdraw] = useState('');

    useEffect(() => {
        // set account address
        window.tronWeb.trx
            .getAccount()
            .then((data) => {
                setAddress(window.tronWeb.address.fromHex(data.address));

                contract && contract
                    .users(window.tronWeb.address.fromHex(data.address))
                    .call()
                    .then((data) => {
                        setCanWithdraw(window.tronWeb.toDecimal(data.withdrawableAt - Math.round(Date.now() / 1000)));
                    })

                setReferralURL(`https://centralbank-tron.com/dashboard/${window.tronWeb.address.fromHex(data.address)}`);
            }
            );

        // set account balance
        window.tronWeb.trx.getBalance(address).then((data) => setBalance(data));
    }, [address, contract]);

    const claimROI = () => {
        setIsLoading(true);

        contract && contract
            .users(window.tronWeb.address.fromHex(address))
            .call()
            .then((data) => {
                const timeToRound = Math.floor((Math.round(Date.now() / 1000) - data.withdrawableAt) / 86400) + 1;

                contract.withdraw(timeToRound).send().then(() => {
                    console.log("Withdrawed Successfully!");
                    setTimeout(() => { window.location.reload() }, 40000);
                })
            })
    }

    return (
        <div className="topBar">
            <div className="walletAddress">
                <b>Your Address</b>: {address}
                <CopyToClipboard text={referralURL}
                    onCopy={() => setCopied(true)}>
                    <button style={{ margin: "5px", background: "#26DE81", border: "none", color: "#fff", padding: "10px", borderRadius: "4px", fontWeight: "600" }}>COPY REFERRAL LINK</button>
                </CopyToClipboard>
                {Copied ? <span style={{ color: 'red' }}>Copied.</span> : null}

            </div>
            <div className={canWithdraw > 0 ? "walletBalance nonWithdrawable" : "walletBalance"}>
                <div style={{ marginRight: "10px" }}><b>Your Balance</b>: {(balance / 10 ** 6).toFixed(2)} TRX</div>
                <Button onClick={() => claimROI()} disabled={canWithdraw > 0 ? true : false}>Claim ROI {canWithdraw > 0 && <div>- {(canWithdraw / 3600).toFixed(2)} hr left</div>}</Button>
            </div>
        </div>
    )
}
