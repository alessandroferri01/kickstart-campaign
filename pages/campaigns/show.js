import React, { Component } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import { Card, Header, Grid } from "semantic-ui-react";
import ContributeForm from '../../components/ContributeForm';

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const address = props.query.address;
        const campaign = Campaign(address);
        
        const summary = await campaign.methods.getSummary().call();
        const nameCampaign = await campaign.methods.nameCampaign().call()

        return {
            mininumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            nameCampaign
        };
    }

    renderCards() {
        const {
            mininumContribution,
            balance,
            manager,
            requestsCount,
            approversCount,
        } = this.props

        const items = [
            {
                header: manager,
                meta: 'Address of manager',
                description: 'The manager created this campaign and can create requests for the campaign',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: mininumContribution,
                meta: 'Minimium Contribution',
                description: 'You must contribute at least this much wei to become an approver',
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Requests mu be approved by approvers',
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to this campaign',
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has left to spend',
            },
        ];

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <h1>Campaign Show</h1>
                <Grid>
                    <Grid.Column width={11}>
                        <Header as='h2' color='green'>{this.props.nameCampaign}</Header>
                        {this.renderCards()}
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <ContributeForm/>
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;