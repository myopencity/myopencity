import React, { Component } from 'react';
import { Grid, Header, Form, Input, Button, Container, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'

class ResetPassword extends Component {

    state = {
        password: "",
        password_confirmation: ""
    }

    handleChange = (e, { attr }) => {
        let state = this.state
        state[attr] = e.target.value
        this.setState(state)
    }

    submit_form = (e) => {
        e.preventDefault()
        const { password, password_confirmation } = this.state
        const { token } = this.props.match.params
        Meteor.call('users.reset_password', { token, password, password_confirmation }, (error, result) => {
            if (error) {
                console.log(error)
                Bert.alert({
                    title: "Erreur lors de la modification de votre mot de passe",
                    message: error.reason,
                    type: 'danger',
                    style: 'growl-bottom-left',
                })
            } else {
                Bert.alert({
                    title: "Votre mot de passe a bien été modifié",
                    message: "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe",
                    type: 'success',
                    style: 'growl-bottom-left',
                })
                this.props.history.push('/sign_in')
            }
        });
    }

    render() {
        const { password, password_confirmation } = this.state

        return (
            <Container>
                <Grid stackable>
                    <Grid.Column width={16} className="center-align">
                        <Icon name="lock" size="huge" className="wow fadeInUp"/>
                        <Header as='h1' className="wow fadeInDown">Changement de mot de passe</Header>
                        <Form onSubmit={this.submit_form}>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>Nouveau mot de passe</label>
                                    <Input type='password' onChange={this.handleChange} value={password} attr="password" />
                                </Form.Field>
                                <Form.Field>
                                    <label>Confirmation du nouveau mot de passe</label>
                                    <Input type='password' onChange={this.handleChange} value={password_confirmation} attr="password_confirmation" />
                                    {password && password_confirmation && (password !== password_confirmation) ?
                                        <label>Le mot de passe et sa confirmation sont différents</label>
                                        : ''}
                                </Form.Field>
                            </Form.Group>
                            <Form.Field>
                                <Button color='green' content='Envoyer' disabled={password == '' || password_confirmation == '' || password !== password_confirmation} />
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

export default withRouter(ResetPassword)