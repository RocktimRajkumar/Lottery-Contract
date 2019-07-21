const HDWalletProvider = require("truffle-hdwallet-provider");

const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

require('dotenv').config();

const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 8
}
const provider = new HDWalletProvider(
    process.env.mnemonic,
    process.env.link
);

const web3 = new Web3(provider, null, OPTIONS);
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attemping to deploy to accounts ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    console.log('Contract deploy to ', result.options.address);
};

deploy();