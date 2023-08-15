import { ethers } from "ethers";

// Copy from 'solidity-contract/artifacts/contracts/Lock.sol/Lock.json'
import lockContract from "./Lock.json";

const AXON_INTERNAL_ALPHA_NET = "https://rpc-alphanet-axon.ckbapp.dev";

// Configrued Axon genesis account to the local / test network.
const AXON_PRIVATE_KEY =
  "0x37aa0f893d05914a4def0460c0a984d3611546cfb26924d7a7ca6e0db9950a2d";

// Address of the deployed contract
const contractAddress = "0x7CcECF6cc5E022F7D582deF5d5b53fD179f9A368";

async function main() {
  // Connect to the local network
  let provider = new ethers.JsonRpcProvider(AXON_INTERNAL_ALPHA_NET);

  const signer = new ethers.Wallet(AXON_PRIVATE_KEY, provider);

  // Instantiate a new ethers contract
  const contract = new ethers.Contract(
    contractAddress,
    lockContract.abi,
    signer,
  );

  console.log(
    "before calling the contract: ",
    await provider.getBalance(contract.target),
  );

  // Call the contract functions
  await contract.withdraw();

  console.log(
    "after calling the contract: ",
    await provider.getBalance(contract.target),
  );

  console.log("unlock time: ", await contract.unlockTime());
  console.log("contract owner: ", await contract.owner());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
