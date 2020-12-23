import React, { useState, useEffect } from 'react'
import { Button } from "@material-ui/core";
import { CopyToClipboard } from 'react-copy-to-clipboard';


export default function Topbar({ contract, setIsLoading }) {
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("0");
    const [ROIClaimableAt, setROIClaimableAt] = useState('');
    const [Copied, setCopied] = useState(false);
    const [referralURL, setReferralURL] = useState('');


    useEffect(() => {
        // set account address
        window.tronWeb.trx
            .getAccount()
            .then((data) => {
                setAddress(window.tronWeb.address.fromHex(data.address));
                setReferralURL(`https://centralbank-tron.com/dashboard/${window.tronWeb.address.fromHex(data.address)}`);
            }
            );

        // set account balance
        window.tronWeb.trx.getBalance(address).then((data) => setBalance(data));
    }, [address]);

    useEffect(() => {
        window.tronWeb.trx
            .getAccount()
            .then((data) => {
                contract && contract
                    .users(window.tronWeb.address.fromHex(data.address || data.__payload__.address))
                    .call()
                    .then((data) => {
                        setROIClaimableAt(data.ROIClaimableAt._hex !== "0x00" && window.tronWeb.toDecimal(data.ROIClaimableAt) - Math.round(Date.now() / 1000))
                    })
            }
            );
    }, [contract])

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
            <div className="walletBalance">
                <div style={{marginRight: "10px"}}><b>Your Balance</b>: {balance / 10 ** 6} TRX</div>
                <Button disabled={ROIClaimableAt >= 0 && true} onClick={() => {
                    contract.claimROI().send().then(() => {});
                    setIsLoading(true)
                    setTimeout(() => {window.location.reload()}, 60000);
                }}>Claim Daily ROI - {(ROIClaimableAt / 3600).toFixed(2)} hr Left</Button>
            </div>
        </div>
    )
}
