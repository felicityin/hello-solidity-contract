import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// Axon Genesis account to the local / test network.
const AXON_PRIVATE_KEY = "0x37aa0f893d05914a4def0460c0a984d3611546cfb26924d7a7ca6e0db9950a2d";

const config: HardhatUserConfig = {
    solidity: "0.8.19",
    networks: {
        axon: {
            chainId: 2022,
            url: "https://rpc-alphanet-axon.ckbapp.dev", // internal Axon alpha net
            accounts: [AXON_PRIVATE_KEY],
            allowUnlimitedContractSize: true,
        }
    }
};

export default config;
