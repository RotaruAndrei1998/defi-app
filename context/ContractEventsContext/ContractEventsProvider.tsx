import { useContext, useEffect } from "react";
import ContractContext from "../ContractContext/ContractContext";
import { ethers } from "ethers";

const ContractEventsProvider = ({ children }) => {
  const { contract } = useContext(ContractContext);



  return children;
};

export default ContractEventsProvider;
