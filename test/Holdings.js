const { expect } = require("chai");


describe("Tests", function () {
  it("Deploys Contract", async function () {
    const [owner] = await ethers.getSigners();

    const Holdings = await ethers.getContractFactory("Holdings");
    await Holdings.deploy();
  });
  
});