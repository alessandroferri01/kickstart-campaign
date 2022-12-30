import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0xfb9c682f423Bc7dee0cDAC22B702b70ad8AeF855'
)

export default instance;