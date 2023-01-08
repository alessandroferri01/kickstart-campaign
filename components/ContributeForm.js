import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react"

class ContributeForm extends Component {
    render() {
        return (
        <Form>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input
                    label="ether"
                    labelPosition="right" 
                    style={{marginBottom:'15px'}}/>
                <Button primary>Contribute!</Button>
            </Form.Field>
        </Form> 
        )
        
    }
}

export default ContributeForm;