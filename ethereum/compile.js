const path = require('path'); //compabilità path tra diversi sistemi
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaing.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Campaing.sol': {
        content: source,
        },
    },
    settings: {
        outputSelection: {
        '*': {
            '*': ['*'],
        },
        },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaing.sol'];

fs.ensureDirSync(buildPath); //se non esiste elemento, lo crea (file o cartella)

for(let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract + '.json'),
        output[contract]
    )
}