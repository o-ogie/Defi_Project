// import { ethers } from "hardhat";

// async function main() {
//   const deployer = await ethers.getSigners();

//   console.log("Deploying contracts with the account:", deployer);

//   const ContractFactory = await ethers.getContractFactory("Airdrop");
//   const contract = await ContractFactory.deploy(0xC8C4e621A60748FF5b0088D57dbfDCc2F5ef4794 as String,"0x289A34D6de47ffeab5682BEC081D4de2dfCb1841" as String);

//   await contract.deployed();

//   console.log("YourContractName deployed to:", contract.address);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });