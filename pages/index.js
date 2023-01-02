import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory.js";
import Campaign from "../ethereum/campaign.js";
import Layout from "../components/Layout.js";

class CampaignIndex extends Component {
    static async getInitialProps() { //methodo globale di NextJs, chiamato prima del rendering del componente. Setta i props globali
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        const campaignsNames = await Promise.all(campaigns.map(async (address) => {
            let campaign = null;
            let obj = {};
            campaign = await Campaign(address);

            if(campaign) {
                obj[address] = await campaign.methods.nameCampaign().call();
                return obj;
            }
        }));
        
        return {campaigns, campaignsNames};
    }

    renderCampaigns() {
        const items = this.props.campaigns.map((address) => {
            let nameCampaign = this.props.campaignsNames.map((item) => {
                if(item[address] !== undefined) {
                    return item[address];
                }
            });
            
            nameCampaign = nameCampaign.filter(item => item !== undefined);

            return {
                header: nameCampaign,
                meta: address.substring(0, 5) + '...' + address.substring(38, 42),
                description: <a>View Campaigns</a>,
                fluid: true,
            };
       });

       return <Card.Group items={items} />
    } 

    render() {
        return (
        <Layout>
            <h3>Open Campaigns</h3>
            <Button 
                primary
                floated="right"
                content='Create a Campaign' 
                icon='add circle' 
                labelPosition='left' />

            {this.renderCampaigns()}
        </Layout>
        );
    }
}

export default CampaignIndex;