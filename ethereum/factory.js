import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0x8844D310B0DF03a3F87C2aA56d947140887BC511'
)

export default instance;