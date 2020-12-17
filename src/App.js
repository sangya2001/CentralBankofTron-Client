import React, { useState, useEffect } from "react";
import "./App.css";
import {initContract} from "./Utils/Utils";

// components
import Loading from "./Components/Loading";

// packages
import {AnimatePresence} from 'framer-motion';

function App() {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    initContract().then((contract) => {
      setContract(contract);
    });
  }, []);
  return (
    <AnimatePresence>
      {!contract && <Loading/>}
    </AnimatePresence>
  );
}

export default App;
