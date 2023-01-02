import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class CampaignNew extends Component {
    state = {
        minimunContribution: '',
        nameCampaign: '',
        errorMessage: ''
    }

    onSubmit = async (event) => {
        event.preventDefault();

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimunContribution, this.state.nameCampaign)
                .send({
                    from: accounts[0],
                });
        } catch(err) {
            this.setState({ errorMessage: err.message });
        }
    }

    render() {
        return (
            <Layout>
                <h3>Create a Campaign!</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Name of Campaign</label>
                        <Input
                            onChange={event => this.setState({nameCampaign: event.target.value})} 
                            value={this.state.nameCampaign}
                            placeholder="Inser name..."
                            required
                            ></Input>
                    </Form.Field>
                    <Form.Field>
                        <label>Minimun Contribution</label>
                        <Input 
                            onChange={event => this.setState({minimunContribution: event.target.value})} 
                            value={this.state.minimunContribution}
                            label="wei" 
                            labelPosition="right" 
                            placeholder="Inser value..."
                            required></Input>
                    </Form.Field>
                    <Message error header="Oops! Somethings went wrong!" content={this.state.errorMessage}/>
                    <Button primary>Create!</Button>
                </Form>
            </Layout>
        )
    }
}

export default CampaignNew;