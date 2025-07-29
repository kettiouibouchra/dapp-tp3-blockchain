module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777",
      gas: 5000000, 
      gasPrice: 20000000000,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.21",
      settings: {
        optimizer: {
          enabled: false, 
          runs: 200
        },
        evmVersion: "london"
      }
    }
  }
};