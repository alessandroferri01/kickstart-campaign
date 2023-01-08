import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react"
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from '../routes';

class ContributeForm extends Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false,
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const campaign = Campaign(this.props.activeAddress);
        this.setState({loading: true});

        try {  
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });

            Router.replaceRoute(`/campaigns/${this.props.activeAddress}`); //refrash della pagina senza considerare il web history
        } catch(err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({loading: false});
    }

    render() {
        return (
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input
                    value={this.state.value}
                    onChange={event => this.setState({value: event.target.value})}
                    label="ether"
                    labelPosition="right" 
                    style={{marginBottom:'15px'}}/>
                <Message error header="Oops! Somethings went wrong!" content={this.state.errorMessage}/>
                <Button primary loading={this.state.loading}>Contribute!</Button>
            </Form.Field>
        </Form> 
        )
        
    }
}

export default ContributeForm;