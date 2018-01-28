import React, { Component } from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import { Grid, Form, Input, Checkbox, Divider, Button, Card, Image, Header, Item } from 'semantic-ui-react'
import TinyMCE from 'react-tinymce'
import { SketchPicker } from 'react-color'

export default class ConfigurationConsultsForm extends Component {

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
        console.log('attr', attr)
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
                        <Divider className="opencity-divider" style={{ color: configuration.navbar_color }} section>Termes et hauteurs</Divider>
                        <Form.Group widths="equal">
                            <Form.Input
                                label="Terme pour les 'soutiens' d'alternative"
                                placeholder="ex: likes"
                                name="alternative_likes_term"
                                value={configuration.alternative_likes_term}
                                onChange={this.handleConfigurationChange}
                            />
                            <Form.Input
                                label="Hauteur de la bannière de consultation"
                                placeholder="10em"
                                name="consult_header_height"
                                value={configuration.consult_header_height}
                                onChange={this.handleConfigurationChange}
                            />
                            <Form.Input
                                label="Taille du texte de description"
                                placeholder="1.2em"
                                name="consult_description_font_size"
                                value={configuration.consult_description_font_size}
                                onChange={this.handleConfigurationChange}
                            />
                        </Form.Group>

                        <Divider className="opencity-divider" style={{ color: configuration.navbar_color }} section>COULEURS</Divider>
                        <Form.Group>
                            <Form.Field>
                                <label>Couleur des titres de consultation</label>
                                <SketchPicker color={configuration.consult_header_color} onChangeComplete={(e) => { this.handleColorChange('consult_header_color', e) }} />
                            </Form.Field>
                            <Form.Field>
                                <label>Couleur de fond de la description</label>
                                <SketchPicker color={configuration.consult_description_background_color} onChangeComplete={(e) => { this.handleColorChange('consult_description_background_color', e) }} />
                            </Form.Field>
                            <Form.Field>
                                <label>Couleur du texte de description</label>
                                <SketchPicker color={configuration.consult_description_color} onChangeComplete={(e) => { this.handleColorChange('consult_description_color', e) }} />
                            </Form.Field>
                            <Form.Field>
                                <label>Couleur de l'icone de soutien alternative</label>
                                <SketchPicker color={configuration.alternative_like_icon_color} onChangeComplete={(e) => { this.handleColorChange('alternative_like_icon_color', e) }} />
                            </Form.Field>
                        </Form.Group>
                        <Button color="green" content="Valider les modifications" />
                    </Form>
                </Grid.Column>
            </Grid>

        )
    }
}