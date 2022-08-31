import { useContext } from "react";
import ContractContext from "../../context/ContractContext/ContractContext";

const StakeDeposit = ({ stakedAmount, depositTimestamp }) => {
  const { contract } = useContext(ContractContext);
  const handleUnstake = async () => {
    const unstakeTransaction = await contract.redeem(contract.address ,0);
    const res = await unstakeTransaction.wait();
    console.log(res);
  };
  return (
    <div className="flex">
      <div>{`Staked amount: ${stakedAmount}`}</div>
      <div>{`deposit timestamp: ${depositTimestamp}`}</div>
      <div>
        <button onClick={handleUnstake}>Unstake</button>
      </div>
    </div>
  );
};

export default StakeDeposit;
