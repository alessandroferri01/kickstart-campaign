import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0xd6f74B99290DF633738114a7Fb108e64bCDF12e4'
)

export default instance;