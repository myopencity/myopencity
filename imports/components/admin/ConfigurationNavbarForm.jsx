import React, { Component } from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import { Grid, Form, Input, Checkbox, Divider, Button, Card, Image, Header, Item } from 'semantic-ui-react'
import TinyMCE from 'react-tinymce'
import { SketchPicker } from 'react-color'

export default class ConfigurationNavbarForm extends Component {

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

    handleColorChange = (attr, color, e) => {
        let { configuration } = this.state
        configuration[attr] = color.hex
        this.setState({ configuration })
    }

    render() {
        const { configuration } = this.state

        return (
            <Grid stackable {...this.props} >
                <Grid.Column width={16}>
                    <Form onSubmit={this.submit_form}>
                        <Divider className="opencity-divider" style={{ color: configuration.navbar_color }} section>Boutons affichés</Divider>
                        <Form.Group widths="equal">
                            <Form.Checkbox
                                checked={configuration.navbar_consults}
                                onClick={() => this.toggleConfiguration('navbar_consults')}
                                label="Afficher l'onglet consultations"
                            />
                            <Form.Checkbox
                                checked={configuration.navbar_projects}
                                onClick={() => this.toggleConfiguration('navbar_projects')}
                                label="Afficher l'onglet propositions"
                            />
                        </Form.Group>

                        <Divider className="opencity-divider" style={{ color: configuration.navbar_color }} section>COULEURS</Divider>
                        <Form.Group>
                            <Form.Field>
                                <label>Couleur de la barre de navigation</label>
                                <SketchPicker color={configuration.navbar_color} onChangeComplete={(e) => { this.handleColorChange('navbar_color', e) }} />
                            </Form.Field>
                        </Form.Group>
                        <Button color="green" content="Valider les modifications" />
                    </Form>
                </Grid.Column>
            </Grid>

        )
    }
}