import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Investment({ contract, setIsLoading }) {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [refAddress, setRefAddress] = useState('');
  const errorMsg = "Min Investment is 50TRX.";



  const invest = () => {
    contract
      .investWithReferral(window.tronWeb.address.toHex(refAddress))
      .send({
        callValue: investmentAmount * 1000000,
        shouldPollResponse: true,
      })
      .then((res) => {
        setInvestmentAmount("");
      });

      setIsLoading(true);
      setTimeout(() => {window.location.reload()}, 60000);
  };

  const investWithoutAddress = () => {
    contract
      .investmentWithoutReferral()
      .send({
        callValue: investmentAmount * 1000000,
        shouldPollResponse: true,
      })
      .then((res) => {
        setInvestmentAmount("");
      });

      setIsLoading(true)
      setTimeout(() => {window.location.reload()}, 13000);
  };

  useEffect(() => {
    if(window.location.href.split('/').pop() !== 'dashboard'){
      setRefAddress(window.location.href.split('/').pop())
    }
  }, [])

  return (
    <div className="investment">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <h2>Start Investing</h2>

      <input
        placeholder="TRX Amount"
        type="text"
        value={investmentAmount}
        onChange={(e) => setInvestmentAmount(e.target.value)}
      />

      <input
        placeholder="Referral Address, Blank for none"
        type="text"
        value={refAddress}
        onChange={(e) => setRefAddress(e.target.value)}
      />
      <Button
        onClick={() => {
          if (investmentAmount < 50) {
            toast.error(errorMsg, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setInvestmentAmount("");
            return;
          }
          refAddress !== "" ? invest() : investWithoutAddress();
        }}
      >
        Invest
      </Button>
    </div>
  );
}
