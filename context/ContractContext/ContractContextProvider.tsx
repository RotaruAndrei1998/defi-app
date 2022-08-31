import { useEffect, useMemo, useState } from "react";
import { BigNumber, Contract, ethers } from "ethers";
import abi from "utils/DeFiApp.json";
import ContractContext from "./ContractContext";
import { Simulate } from "react-dom/test-utils";
import input = Simulate.input;

const contractAddress = "0x57EdB18b5e3276806aF211f656BC68c3Ad4C3fb1";
const contractABI = abi.abi;

const ContractContextProvider = ({ children }) => {
  const [contract, setContract] = useState<Contract>(null);
  const [accountAddress, setAccountAddress] = useState<string>(null);
  const [currentAmount, setCurrentAmount] = useState<number>(null);
  const [stakedDeposits, setStakedDeposits] = useState<Array<any>>([]);
  const [allStakedDeposits, setAllStakedDeposits] = useState<Array<any>>([]);
console.log(allStakedDeposits)
  const stakedAmount: number | undefined = useMemo(
    () =>
      stakedDeposits.reduce(
        (acc, deposit) =>
          acc +
          Number(
            ethers.utils.formatEther(
              deposit.amount.mul(BigNumber.from(10).pow(18))
            )
          ),
        0
      ),
    [stakedDeposits]
  );

  const getBalance = async () => {
    try {
      const _currentAmount = await contract.balanceOf(accountAddress);
      const _stakedDeposits = await contract.getStakedUserBalances();
      setCurrentAmount(Number(ethers.utils.formatEther(_currentAmount)));
      setStakedDeposits(_stakedDeposits);
      console.log("balance: ", _currentAmount, _stakedDeposits);
    } catch (e) {
      console.error(e);
    }
  };

  const connectToContract = async () => {
    console.log("try");
    try {
      const { ethereum } = window;
      if (ethereum) {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log(
          "test",
          Number(
            ethers.utils.formatEther(
              BigNumber.from("0x09c4").mul(BigNumber.from(10).pow(18))
            )
          )
        );
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const smartChatContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const _accountAddress = await signer.getAddress();
        const _currentAmount = await smartChatContract.balanceOf(
          _accountAddress
        );
        const _stakedAmount = await smartChatContract
          .connect(signer)
          .getStakedUserBalances();

        console.log(_accountAddress, _currentAmount, _stakedAmount);

        const connectedContract = await smartChatContract.connect(signer);
        setContract(connectedContract);
        setAccountAddress(_accountAddress);
        console.log(ethers.utils.formatEther(_currentAmount));
        setCurrentAmount(Number(ethers.utils.formatEther(_currentAmount)));
        setStakedDeposits(_stakedAmount);
        const _allStakedDeposits = await contract.getAllStakedUserBalances();
        setAllStakedDeposits(_allStakedDeposits)
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    connectToContract();
  }, []);

  useEffect(() => {
    if (!contract || !accountAddress) {
      return;
    }

    const handleTokensStaked = (e1, e2, e3) => {
      console.log("stake event: ", e1, ethers.utils.formatEther(e2), e3);
      if (e1 === accountAddress) {
        getBalance();
      }
    };
    const handleTokensUnstaked = (e1, e2, e3) => {
      console.log("unstake event", e1, ethers.utils.formatEther(e2), e3);
      if (e1 === accountAddress) {
        getBalance();
      }
    };

    contract.on("tokensStaked", handleTokensStaked);
    contract.on("tokensUnstaked", handleTokensUnstaked);

    return () => {
      contract.off("tokensStaked", handleTokensStaked);
      contract.off("tokensUnstaked", handleTokensUnstaked);
    };
  }, [contract, accountAddress]);

  return (
    <ContractContext.Provider
      value={{
        contract,
        contractAddress,
        accountAddress,
        currentAmount,
        stakedAmount,
        stakedDeposits,
        allStakedDeposits
      }}
    >
      {contract ? (
        children
      ) : (
        <button onClick={connectToContract}>Connect</button>
      )}
    </ContractContext.Provider>
  );
};

export default ContractContextProvider;
