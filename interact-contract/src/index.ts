import { ethers } from "ethers";

// Copy from 'solidity-contract/artifacts/contracts/Lock.sol/Lock.json'
import lockContract from "./Lock.json";

const AXON_INTERNAL_ALPHA_NET = "https://rpc-alphanet-axon.ckbapp.dev";

// Axon genesis account configrued on the local / test network.
const AXON_PRIVATE_KEY =
  "0x37aa0f893d05914a4def0460c0a984d3611546cfb26924d7a7ca6e0db9950a2d";

// Address of the deployed contract
const contractAddress = "0xB164eE2a550Cb2A661A07DFEf42e9f5cF072889B";

async function main() {
  // Connect to the network
  let provider = new ethers.JsonRpcProvider(AXON_INTERNAL_ALPHA_NET);

  // A Signer from a private key
  const signer = new ethers.Wallet(AXON_PRIVATE_KEY, provider);

  // Create a new instance of the Contract with a Signer, which allows update methods
  const contract = new ethers.Contract(
    contractAddress,
    lockContract.abi,
    signer,
  );

  console.log(
    "before calling the contract: ",
    await provider.getBalance(contract.target),
  );

  // Call a Contract's non-constant method
  let tx = await contract.withdraw();
  console.log("tx hash: ", tx.hash);

  // The operation is NOT complete yet; we must wait until it is mined
  await tx.wait();

  console.log(
    "after calling the contract: ",
    await provider.getBalance(contract.target),
  );

  // Call Contract's read-only constant methods
  console.log("unlock time: ", await contract.unlockTime());
  console.log("contract owner: ", await contract.owner());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
