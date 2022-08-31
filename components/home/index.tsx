import Link from "next/link";
import AllStakeDeposits from "../stake/AllStakeDeposits";
import { useContext } from "react";
import ContractContext from "../../context/ContractContext/ContractContext";

const mockDeposits = [
  { accountAddress: "test", stakedAmount: 100, depositTimestamp: 112312321 },
  { accountAddress: "test", stakedAmount: 25, depositTimestamp: 112312321 },
  { accountAddress: "test", stakedAmount: 500, depositTimestamp: 112312321 },
];
const Home = () => {
  const { contract, allStakedDeposits } = useContext(ContractContext);

  const getSomeDrot = async () => {
    const test = await contract.getSomeDrot();
    await test.wait();

  };

  return (
    <div className="flex flex-col w-full h-full">
      <h1>Simple staking app</h1>
      <button onClick={getSomeDrot}>Get some DROT</button>
      <Link href="/stake">Stake some DROT</Link>
      <AllStakeDeposits allStakeDeposits={allStakedDeposits} />
    </div>
  );
};

export default Home;
