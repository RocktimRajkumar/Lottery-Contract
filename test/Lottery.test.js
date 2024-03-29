const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 8
}
const web3 = new Web3(ganache.provider(), null, OPTIONS);

const { interface, bytecode } = require('../compile');

let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    lottery = await web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Lottery Contract', () => {

    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('allows one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(players.length, 1);

    });

    it('allows multiple account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.05', 'ether')
        });

        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.07', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(players.length, 3);
    });

    it('requires a minimum amount of ether to enter', async () => {
        var check = true;
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 140
            });
            check = false;
        } catch (err) {
            check = true;
        }

        if (check) {
            assert(true);
        } else {
            assert(false);
        }

    });

    it('only manager can call pickWinner', async () => {
        var check = true;
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei('0.02', 'ether')
            });
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
            check = false;
        } catch (err) {
            check = true;
        }

        if (check) {
            assert(true);
        } else {
            assert(false);
        }
    });

    it('sends money to the winner and resets the players array', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('4', 'ether')
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);

        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });

        const finalBalance = await web3.eth.getBalance(accounts[0]);

        const difference = finalBalance - initialBalance;

        assert(difference > web3.utils.toWei('3.8', 'ether'));
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });
        assert(players.length < 1);
        assert(await lottery.methods.getTotalBalance().call({ from: accounts[0] }) < 1);
    });

});