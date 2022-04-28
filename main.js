const { ethers, BigNumber } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
// TEST WALLETS PROVIDED BY HARDHAT DO NOT SEND ETH TO THESE
const ownerAccount = new ethers.Wallet(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  provider
);
const account1 = new ethers.Wallet(
  "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
  provider
);
const account2 = new ethers.Wallet(
  "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
  provider
);
const account3 = new ethers.Wallet(
  "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6",
  provider
);
const CONTRACT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const { abi } = require("./artifacts/contracts/Holdings.sol/Holdings.json");

const balances = async () => {
  const ownerBalance = await provider.getBalance(ownerAccount.address);
  console.log(`owner balance: ${ethers.utils.formatEther(ownerBalance)} Eth`);
  const account1Balance = await provider.getBalance(account1.address);
  console.log(
    `account1 balance: ${ethers.utils.formatEther(account1Balance)} Eth`
  );
};


const getGasData = async () => {
    const feeData = await provider.getFeeData();
    return {
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
    }
}

const getWalletBalance = async (account) => {
  const balance = await provider.getBalance(account.address);
  console.log(
    `${account.address} balance: ${ethers.utils.formatEther(balance)} Eth`
  );
};

const depostETH = async (signer, amount) => {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  amount = ethers.utils.parseEther(amount);
  await contract.deposit(amount, {
    ...await getGasData(),
    value: amount,
  });

  console.log(`Deposited ${ethers.utils.formatEther(amount)} ETH.`);
  await getWalletBalance(signer);
  await getContractBalance(signer);
};

const getContractBalance = async (signer) => {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  const getBalance = await contract.getTotalBalance();
  console.log(`Contract holds ${ethers.utils.formatEther(getBalance)} ETH.`);
};

const withdrawAccount = async (signer) => {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  await contract.userWithdrawAll(await getGasData());
  await getWalletBalance(signer);
  await getContractBalance(signer);
};

const withdrawAmount = async (signer, amount) => {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  amount = ethers.utils.parseEther(amount);
  await contract.withdraw(amount, await getGasData());

  console.log(`Withdrew ${ethers.utils.formatEther(amount)} ETH.`);
  await getWalletBalance(signer);
  await getContractBalance(signer);
};

const withdrawAll = async (signer) => {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  await contract.withdrawAll(await getGasData());
  await getContractBalance(signer);
};
depostETH(account1, "50");
// withdrawAll(ownerAccount);

// depostETH(account2, 100);
// depostETH(account3, 150);
// withdrawAccount(account3);

// npx hardhat node
// npx hardhat run --network localhost deployment/deploy.js