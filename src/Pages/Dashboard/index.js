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

export default function Dashboard() {
  const [contract, setContract] = useState(null);

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

      console.log(contract);
    });
  }, []);
  return (
    <div className="dashboard">
      {contract ? (
        <div>
          <Navbar />
          <Topbar contract={contract}/>
          <hr />
          <div className="scrollableZone">
            <UniversalData contract={contract} />
            <hr />
            {isUser !== 0 && <AssetInfo contract={contract} />}
            {isUser !== 0 && <hr />}
            {isUser !== 0 && <ReferralInfo contract={contract}/>}
            {isUser === 0 && <Investment contract={contract} />}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
