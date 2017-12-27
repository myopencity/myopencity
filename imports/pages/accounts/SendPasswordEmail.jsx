import React, { Component } from 'react';
import { Grid, Header, Input, Form, Button } from 'semantic-ui-react';

export default class SendPasswordEmail extends Component {

    state = {
        email: ""
    }

    handleChange = (e, {name}) => {
        let state = this.state
        state[name] = e.target.value
        this.setState(state)
    }

    sendPasswordEmail = (e) => {
        const { email } = this.state
        Meteor.call('users.reset_password_email', email, (error, result) => {
            if (error) {
                console.log(error)
                Bert.alert({
                    title: "Une erreur est survenue lors de l'envoi de l'email",
                    message: error.reason,
                    type: 'danger',
                    style: 'growl-bottom-left',
                })
            } else {
                Bert.alert({
                    title: "Un email de réinitialisation vous a été envoyé",
                    message: "Cliquez sur le lien dans l'email",
                    type: 'success',
                    style: 'growl-bottom-left',
                })
            }
        });
    }

    render() {
        const { email } = this.state
        return (
            <Grid stackable>
                <Grid.Column width={16} className="center-align">
                    <Header as='h3'>Vous avez perdu votre mot de passe ?</Header>
                    <p>Entrez votre adresse email pour recevoir un email de réinitialisation</p>
                    <Form onSubmit={this.sendPasswordEmail}>
                        <Form.Field>
                            <Input type="email" onChange={this.handleChange} name={email} value={email} placeholder="Email" />
                        </Form.Field>
                        <Form.Field>
                            <Button disabled={!email} color="green" icon="mail" content="Demander un nouveau mot de passe" />
                        </Form.Field>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}