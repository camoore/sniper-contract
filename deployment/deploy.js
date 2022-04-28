const main = async () => {

    const [owner] = await ethers.getSigners();
    console.log(`Address deploying the contract --> ${owner.address}`);

    const holdings = await ethers.getContractFactory("Holdings");
    const contract = await holdings.deploy();

    console.log(`Holdings contract address --> ${contract.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });