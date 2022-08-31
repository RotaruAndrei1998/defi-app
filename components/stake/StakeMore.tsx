import { ethers } from "ethers";
import { useRef } from "react";

const StakeMore = ({ contract }) => {
  const inputRef = useRef();

  const handleStake = async () => {
    const value = inputRef.current.value;
    await contract.approve(
      contract.address,
      ethers.utils.parseEther(value.toString())
    );
    const stakeTransaction = await contract.stake(contract.address, value);
    const res = await stakeTransaction.wait();
    console.log(res);
  };
  return (
    <div className="flex">
      <input ref={inputRef} type="number" placeholder="DROT amount" />
      <button onClick={handleStake}>Stake</button>
    </div>
  );
};

export default StakeMore;
