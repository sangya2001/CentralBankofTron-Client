import React, { useState, useEffect } from 'react'
import { Button } from "@material-ui/core";
import {CopyToClipboard} from 'react-copy-to-clipboard';


export default function Topbar({ contract }) {
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("0");
    const [ROIClaimableAt, setROIClaimableAt] = useState('');
    const [Copied, setCopied] = useState(false);

    const refralURL = "https://centralbank-tron.com/dashboard/refer/"+address;

   
    useEffect(() => {
        // set account address
        window.tronWeb.trx
            .getAccount()
            .then((data) => {
                setAddress(window.tronWeb.address.fromHex(data.address || data.__payload__.address));
                window.tronWeb.setAddress(data.address || data.__payload__.address);
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
               <CopyToClipboard text={refralURL}
                onCopy={() => setCopied(true)}>
                <button style={{margin:"5px"}}>Click to copy refral link</button>
                </CopyToClipboard>
                {Copied ? <span style={{color: 'red'}}>Copied.</span> : null}
             
            </div>
            <div className="walletBalance">
                <Button disabled={ROIClaimableAt >= 0 && true}>Recharge ROI - {(ROIClaimableAt / 3600).toFixed(2)} hr Left</Button>
                <b>Your Balance</b>: {balance / 10 ** 6} TRX
            </div>
        </div>
    )
}
