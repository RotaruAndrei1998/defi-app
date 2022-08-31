import { memo } from "react";
import StakeDeposit from "./StakeDeposit";
import StakeDeposits from "./StakeDeposits";

const AllStakeDeposits = ({ allStakeDeposits }) => {
  const allStakeDepositsPerUser = allStakeDeposits.reduce(
    (result, stakeDeposit) => {
      const { accountAddress } = stakeDeposit;
      if (result[accountAddress]) {
        result[accountAddress].push(stakeDeposit);
        return result;
      }
      result[accountAddress] = [stakeDeposit];
      return result;
    },
    {}
  );

  return (
    <div>
      {Object.entries(allStakeDepositsPerUser).map(([address, deposits]) => {
        return (
          <div>
            <div>{address}</div>
            <StakeDeposits accountStakeDeposits={deposits} />
          </div>
        );
      })}
    </div>
  );
};

export default memo(AllStakeDeposits);
