import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import "./style.css";

// supportive components
import { initContract } from "../../Utils/Utils";
import Loading from "../../Components/Loading";
import AssetInfo from "../../Components/AssetInfo";
import Topbar from "../../Components/Topbar";
import UniversalData from "../../Components/UniversalData";
import ReferralInfo from "../../Components/ReferralInfo";
import Investment from "../../Components/Investment";
import InvestmentPeriod from "../../Components/InvesmentPeriod";

export default function Dashboard() {
  const [contract, setContract] = useState(null);
  const [investmentPeriod, setInvestmentPeriod] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // user details
  const [isUser, setIsUser] = useState(0);

  useEffect(() => {
    // initilize the contract
    initContract().then((contract) => {
      window.tronWeb.trx.getAccount().then((data) =>
        {
          // check if user is registered or not
          contract
          .users(window.tronWeb.address.fromHex(data.address))
          .call()
          .then((data) => {
            setIsUser(window.tronWeb.toDecimal(data.totalInvestment));
          })
          
          // set end period
          contract
            .users(window.tronWeb.address.fromHex(data.address))
            .call()
            .then((data) => {
              setInvestmentPeriod(
                window.tronWeb.toDecimal(
                  data.investmentPeriodEndsAt - Math.round(Date.now() / 1000)
                )
              );
            });
        }
      );

      setContract(contract);
    });
  }, []);
  return (
    <div className="dashboard">
      {contract && !isLoading ? (
        <div>
          <Navbar />
          <Topbar contract={contract} setIsLoading={setIsLoading}/>
          <hr />
          <div className="scrollableZone">
            <UniversalData contract={contract} />
            <hr />
            {isUser !== 0 && <InvestmentPeriod contract={contract} setIsLoading={setIsLoading}/>}
            {isUser !== 0 && investmentPeriod > 0 && <AssetInfo contract={contract}/>}
            {isUser !== 0 && <hr />}
            {isUser !== 0 && investmentPeriod > 0 && <ReferralInfo contract={contract} setIsLoading={setIsLoading}/>}
            {isUser === 0 && <Investment contract={contract} setIsLoading={setIsLoading}/>}
          </div>
        </div>
      ) : (
          <Loading />
        )}
    </div>
  );
}
