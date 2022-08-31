import { expect } from "chai";
import { ethers, waffle } from "hardhat";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const DeFiAppContract = await ethers.getContractFactory("DeFiApp");
    const deFiAppContract = await DeFiAppContract.deploy("Hello, Hardhat!");

    await deFiAppContract.deployed();

    console.log("Greeter deployed to:", deFiAppContract.address);
    const [signer, acc1, acc2] = await ethers.getSigners();

    await deFiAppContract.connect(acc1).getSomeDrot();
    const balance = await waffle.provider.getBalance(acc1.address);
    console.log("balance", balance);
    // expect(await greeter.greet()).to.equal("Hello, world!");
    //
    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
    //
    // // wait until the transaction is mined
    // await setGreetingTx.wait();
    //
    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
