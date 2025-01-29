require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Default Hardhat Network URL
    },
    hardhat: {
      chainId: 1337,
    },
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};
