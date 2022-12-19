const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //construttore => usato per instanziare ogetti di tipo Web3
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

let accounts;
let lottery;


beforeEach(async () => { //azioni preliminari per ogni it (test)
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    //Use one of this account to Deploy the contract
    lottery = await new web3.eth.Contract(abi)
    .deploy({ 
        data: evm.bytecode.object
    })
    .send({
        from: accounts[0],
        gas: '1000000'
    });
});

describe('Lottery Contract', () => {
    it('deploy a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('allow one account to enter', async () => {
        await lottery.methods.enter().send({ //.send() perchè è una transazione, eseguo una modifica e manda una transazione che ha un gasPrice.
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether'),
        });

        const players = await lottery.methods.getPlayers().call({ //.call(), chiamo una funzione del contratto senza transazione e senza cambiare lo stato del contratto
            from: accounts[0],
        })

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length)
    });

    it('allow multiple accounts to enter', async () => {
        await lottery.methods.enter().send({ //.send() perchè è una transazione, eseguo una modifica e manda una transazione che ha un gasPrice.
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether'),
        });

        await lottery.methods.enter().send({ //.send() perchè è una transazione, eseguo una modifica e manda una transazione che ha un gasPrice.
            from: accounts[1],
            value: web3.utils.toWei('0.03', 'ether'),
        });

        await lottery.methods.enter().send({ //.send() perchè è una transazione, eseguo una modifica e manda una transazione che ha un gasPrice.
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether'),
        });

        const players = await lottery.methods.getPlayers().call({ //.call(), chiamo una funzione del contratto senza transazione e senza cambiare lo stato del contratto
            from: accounts[0],
        })

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length)
    });

    it('require a minimum amount of ether', async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0
            });

            assert(false);
        } catch(e) {
            assert(e);
        }
    });

    it('only manager can call pickWinner', async () => {
        try {
            await lottery.methods.pickWinner.send({
                from: accounts[1],
            });
            assert(false); // se arrivo a questa linea di codice il test non è valido, dato che solo accounts[0] può chiamare pickWinner (manager)
        } catch(e) {
            assert(e);
        }
    });

    it('send money to winner e reset players array', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether'),
        });
        
        const initialBalance = await web3.eth.getBalance(accounts[0]);
        await lottery.methods.pickWinner().send({
            from: accounts[0],
        });
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        const difference = finalBalance - initialBalance;

        assert(difference > web3.utils.toWei('1.9', 'ether')); //1.8 e non 2 a causa del costo (Gas) dell'esecuzione di una transazione all'interno della rete

        const players = await lottery.methods.getPlayers().call({ //.call(), chiamo una funzione del contratto senza transazione e senza cambiare lo stato del contratto
            from: accounts[0],
        });

        assert.equal(0, players.length)
    });
});