import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import factory from "../ethereum/factory.js";
import 'semantic-ui-css/semantic.min.css'

class CampaignIndex extends Component {
    static async getInitialProps() { //methodo globale di NextJs, chiamato prima del rendering del componente. Setta i props globali
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        return {campaigns};
    }

    renderCampaigns() {
       const items =  this.props.campaigns.map(address => {
        return {
            header: address,
            description: <a>View Campaigns</a>,
            fluid: true,
        };
       });

       return <Card.Group items={items} />
    } 

    render() {
        return (
        <div>
            {this.renderCampaigns()}
        </div>
        );
    }
}

export default CampaignIndex;