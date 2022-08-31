import UserDetails from "./UserDetails";
import StakeMore from "./StakeMore";
import StakeDeposits from "./StakeDeposits";
import { useContext } from "react";
import ContractContext from "../../context/ContractContext/ContractContext";

const mockDeposits = [
  {
    stakedAmount: 100,
    depositTimestamp: 112312321,
  },
  {
    stakedAmount: 25,
    depositTimestamp: 112312321,
  },
  {
    stakedAmount: 500,
    depositTimestamp: 112312321,
  },
];

const mockAccount = {
  accountAddress: "0x4fC7F85E5f876BA77D45E60c297C98513E4396cE",
  currentAmount: 15000,
  stakedAmount: 625,
};
const Stake = () => {
  const {
    accountAddress,
    stakedAmount,
    currentAmount,
    contract,
    stakedDeposits,
  } = useContext(ContractContext);

  return (
    <div className="flex flex-col w-full h-full">
      <UserDetails
        stakedAmount={stakedAmount}
        accountAddress={accountAddress}
        currentAmount={currentAmount}
      />
      <StakeMore contract={contract} />
      <StakeDeposits accountStakeDeposits={stakedDeposits} />
    </div>
  );
};

export default Stake;
