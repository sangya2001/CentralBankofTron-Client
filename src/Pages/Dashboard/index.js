import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import "./style.css";

import { initContract } from "../../Utils/Utils";
import Loading from "../../Components/Loading";
import AssetInfo from "../../Components/AssetInfo";
import Topbar from "../../Components/Topbar";
import UniversalData from "../../Components/UniversalData";
import ReferralInfo from "../../Components/ReferralInfo";
import Investment from "../../Components/Investment";
import { useParams } from "react-router-dom";
import InvestmentPeriod from "../../Components/InvesmentPeriod";

export default function Dashboard() {
  const [contract, setContract] = useState(null);
  const [investmentPeriod, setInvestmentPeriod] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const refralID = (params.refer) ? params.refralID : "";

  // user details
  const [isUser, setIsUser] = useState(0);

  useEffect(() => {
    initContract().then((contract) => {
      // check if user or not
      window.tronWeb.trx.getAccount().then((data) =>
        contract
          .users(window.tronWeb.address.fromHex(data.__payload__.address || data.address))
          .call()
          .then((data) => {
            setIsUser(window.tronWeb.toDecimal(data.compoundAsset));
          })
      );
      setContract(contract);

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
            {isUser !== 0 && investmentPeriod > 0 && <InvestmentPeriod contract={contract} setIsLoading={setIsLoading}/>}
            {isUser !== 0 && investmentPeriod > 0 && <AssetInfo contract={contract} setIsLoading={setIsLoading} />}
            {isUser !== 0 && <hr />}
            {isUser !== 0 && investmentPeriod > 0 && <ReferralInfo contract={contract} setIsLoading={setIsLoading}/>}
            {isUser === 0 && <Investment contract={contract} refralID={refralID} setIsLoading={setIsLoading}/>}
          </div>
        </div>
      ) : (
          <Loading />
        )}
    </div>
  );
}
