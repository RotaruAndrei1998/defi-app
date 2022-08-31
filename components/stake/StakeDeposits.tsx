import StakeDeposit from "./StakeDeposit";

const StakeDeposits = ({ accountStakeDeposits }) => {
  return (
    <div className="flex flex-col">
      {accountStakeDeposits.map((accountStakeDeposit) => {
        const { amount, depositTimestamp } = accountStakeDeposit;
        return (
          <StakeDeposit
            stakedAmount={amount}
            depositTimestamp={depositTimestamp}
          />
        );
      })}
    </div>
  );
};

export default StakeDeposits;
