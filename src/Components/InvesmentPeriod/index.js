import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./style.css";

const InvestmentPeriod = ({ contract, setIsLoading }) => {
  const [investmentPeriod, setInvestmentPeriod] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const errorMsg = "Min Investment is 50TRX.";

  useEffect(() => {
    window.tronWeb.trx.getAccount().then((data) => {
      contract &&
        contract
          .users(
            window.tronWeb.address.fromHex(
              data.address || data.__payload__.address
            )
          )
          .call()
          .then((data) => {
            setInvestmentPeriod(
              window.tronWeb.toDecimal(
                data.withdrawableDisablesAt - Math.round(Date.now() / 1000)
              )
            );
          });
    });
  }, [contract]);

  return (
    <div>
      {0 < investmentPeriod && (
        <div className="investmentPeriod">
          Your investment period ends after{" "}
          {(investmentPeriod / 86400).toFixed(2)} days!
        </div>
      )}

      {investmentPeriod < 0 && (
        <div>
          <div className="investmentPeriod">Your investment period ended!</div>
          <div className="reinvestmentForm">
            <input
              placeholder="TRX Amount"
              type="text"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
            />
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
            <Button
              onClick={() => {
                if (investmentAmount > 50) {
                  contract
                    .reInvest()
                    .send({
                      callValue: investmentAmount * 1000000,
                      shouldPollResponse: true,
                    })
                    .then((res) => {
                      setInvestmentAmount("");
                    });
                    setIsLoading(true)
                    setTimeout(() => {window.location.reload()}, 60000);
                } else {
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
              }}
            >
              RE-INVEST
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentPeriod;
