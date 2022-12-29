// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require("./build/CampaignFactory.json");
const provider = new HDWalletProvider(
    'heavy zoo announce assist cluster blue tourist design place tray art cry', //Secret Recovery Phrase di Metamask
    'https://goerli.infura.io/v3/610553932f2747d189a138d911305bf3'  
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Account' , accounts[0]);

    const result = await new web3.eth.Contract(compiledFactory.abi) //interface è ABI, oggetto JS del contratto
    .deploy({ 
        data: compiledFactory.evm.bytecode.object //codice binario per distribuire il contratto sulla rete ETH
    })
    .send({
        from: accounts[0],
        gas: '1400000'
    });

    console.log('Contract deployed to: ', result.options.address);
    provider.engine.stop();
}

deploy();