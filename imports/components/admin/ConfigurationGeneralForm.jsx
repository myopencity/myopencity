import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Grid, Form, Input, Checkbox, Divider, Button, Item, Image, Header } from 'semantic-ui-react'

export default class ConfigurationGeneralForm extends Component {

    /*
      facultative props:
        - configuration: Object
        - onSubmitForm: Function
    */

    state = {
        configuration: {}
    }

    componentWillMount() {
        if (Meteor.isClient) {
            const configuration = Session.get('global_configuration')
            this.setState({ configuration })
        }
    }

    submit_form = (e) => {
        e.preventDefault()
        Meteor.call('configuration.update', this.state.configuration, (error, result) => {
            if (error) {
                console.log("Configuration update error", error)
                Bert.alert({
                    title: "Erreur lors de la modification de la configuration",
                    message: error.reason,
                    type: 'danger',
                    style: 'growl-bottom-left',
                })
            } else {
                Bert.alert({
                    title: "La configuration a bien été modifiée",
                    type: 'success',
                    style: 'growl-bottom-left',
                })
            }
        })
    }

    handleConfigurationChange = (e) => {
        let { configuration } = this.state
        configuration[e.target.name] = e.target.value
        this.setState({ configuration })
    }

    toggleConfiguration = (attr) => {
        let { configuration } = this.state
        configuration[attr] = !configuration[attr]
        this.setState({ configuration })
    }

    render() {
        const { configuration } = this.state

        return (
            <Grid stackable {...this.props}>
                <Grid.Column width={16}>
                    <Form onSubmit={this.submit_form}>
                        <Divider className="opencity-divider" style={{ color: configuration.navbar_color }} section>Termes généraux</Divider>
                        <Form.Group widths="equal">
                            <Form.Input
                                label="Nom de la plateforme"
                                placeholder="ex: Ma ville"
                                name="main_title"
                                value={configuration.main_title}
                                onChange={this.handleConfigurationChange}
                            />
                            <Form.Input
                                label="Description générale"
                                placeholder="ex: Participez à la démocratie de votre ville"
                                name="main_description"
                                value={configuration.main_description}
                                onChange={this.handleConfigurationChange}
                            />
                            <Form.Checkbox
                                checked={configuration.seo_active}
                                onClick={() => this.toggleConfiguration('seo_active')}
                                label={"Référencement sur les réseaux sociaux"}
                            />
                        </Form.Group>
                        <Divider className="opencity-divider" style={{ color: configuration.navbar_color }} section>Images et icônes</Divider>
                        <Item.Group divided>
                            <Item>
                                <Item.Image size='tiny' src={configuration.global_image_url} />
                                <Item.Content verticalAlign='middle'>
                                    <Header as='h3'>Image principale</Header>
                                    <Form.Input
                                        label="URL de l'image principale"
                                        placeholder="https://..."
                                        name="global_image_url"
                                        value={configuration.global_image_url}
                                        onChange={this.handleConfigurationChange}
                                    />
                                </Item.Content>
                            </Item>
                            <Item>
                                <Item.Image size='tiny' src={configuration.global_logo_url} />
                                <Item.Content verticalAlign='middle'>
                                    <Header as='h3'>Logo de la plateforme</Header>
                                    <Form.Input
                                        label="URL du logo principal"
                                        placeholder="https://..."
                                        name="global_logo_url"
                                        value={configuration.global_logo_url}
                                        onChange={this.handleConfigurationChange}
                                    />
                                </Item.Content>
                            </Item>
                        </Item.Group>
                        <Button color="green" content="Valider les modifications" />
                    </Form>
                </Grid.Column>
            </Grid>

        )
    }
}