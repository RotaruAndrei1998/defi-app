// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {ethers} from "hardhat";
import {DeFiApp} from "typechain";

async function printBalances(deFiAppContract: DeFiApp, owner: SignerWithAddress, acc1: SignerWithAddress, acc2: SignerWithAddress) {
  console.log()
  console.log()
  console.log("########################")
  console.log("########################")
  console.log("########################")
  console.log()
  console.log("Contract");
  console.log("Contract address:", deFiAppContract.address);
  console.log(
    "Contract totalSupply:",
    await deFiAppContract.balanceOf(deFiAppContract.address)
  );
  console.log(
    "Contract balance:",
    await deFiAppContract.balanceOf(deFiAppContract.address)
  );

  console.log(
    "Contract staked values",
    await deFiAppContract.connect(owner).getAllStakedUserBalances()
  );
  console.log(
    "Contract total staked value",
    await deFiAppContract.connect(owner).getTotalStakedValue()
  );

  console.log(
    "Contract getNumberOfStake",
    await deFiAppContract.connect(owner).getNumberOfStake()
  );

  console.log("Contract addresses", await deFiAppContract.connect(owner).getAddresses());

  console.log()
  console.log("########################")
  console.log()

  console.log("Acc1");
  console.log("Acc1 balance", await deFiAppContract.balanceOf(acc1.address));
  console.log(
    "Acc1 stake in contract",
    await deFiAppContract.connect(acc1).getStakedUserBalances()
  );

  console.log()
  console.log("########################")
  console.log()

  console.log("Acc2");
  console.log("Acc2 balance", await deFiAppContract.balanceOf(acc2.address));
  console.log(
      "Acc2 stake in contract",
      await deFiAppContract.connect(acc2).getStakedUserBalances()
  );
}

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  // const [owner, acc1, acc2] = await ethers.getSigners();

  //deploy contract
  const DeFiAppContract = await ethers.getContractFactory("DeFiApp");
  const deFiAppContract = await DeFiAppContract.deploy();
  await deFiAppContract.deployed();
  console.log("contract address:", deFiAppContract.address)

  //get ERC20 tokens
  // await deFiAppContract.connect(acc1).getSomeDrot();
  // await deFiAppContract.connect(acc1).getSomeDrot();
  // await deFiAppContract.connect(acc2).getSomeDrot();
  // await deFiAppContract.connect(acc2).getSomeDrot();
  //
  // await printBalances(deFiAppContract, owner, acc1, acc2)
  //
  // //allowance
  // await deFiAppContract.connect(acc2).approve(deFiAppContract.address, 55);
  // await deFiAppContract.connect(acc1).approve(deFiAppContract.address, 200);
  //
  // //stake
  // await deFiAppContract.connect(acc2).stake(deFiAppContract.address, 55);
  // await deFiAppContract.connect(acc1).stake(deFiAppContract.address, 100);
  // await deFiAppContract.connect(acc1).stake(deFiAppContract.address, 100);
  //
  // await printBalances(deFiAppContract, owner, acc1, acc2)
  //
  // //wait
  // await new Promise((r) => setTimeout(r, 61000));
  //
  // //unstake
  // await deFiAppContract.connect(acc1).redeem(deFiAppContract.address, 0);
  //
  // // wait
  // await new Promise((r) => setTimeout(r, 61000));
  // await new Promise((r) => setTimeout(r, 61000));
  // await new Promise((r) => setTimeout(r, 61000));
  //
  // //unstake
  // await deFiAppContract.connect(acc1).redeem(deFiAppContract.address, 0);
  // await deFiAppContract.connect(acc2).redeem(deFiAppContract.address, 0);
  // await printBalances(deFiAppContract, owner, acc1, acc2)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
