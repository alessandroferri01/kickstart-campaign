// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');
provider = new HDWalletProvider(
    'heavy zoo announce assist cluster blue tourist design place tray art cry', //Secret Recovery Phrase di Metamask
    'https://goerli.infura.io/v3/610553932f2747d189a138d911305bf3'  
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Account' , accounts[0]);

    const result = await new web3.eth.Contract(abi) //interface è ABI, oggetto JS del contratto
    .deploy({ 
        data: evm.bytecode.object //codice binario per distribuire il contratto sulla rete ETH
    })
    .send({
        from: accounts[0],
        gas: '1000000'
    });

    console.log(JSON.stringify(abi));
    console.log('Contract deployed at: ', result.options.address);
    provider.engine.stop();
}

deploy();