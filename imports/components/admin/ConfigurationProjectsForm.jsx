import React, { Component } from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import { Grid, Form, Input, Checkbox, Divider, Button, Card, Image, Header, Item } from 'semantic-ui-react'
import TinyMCE from 'react-tinymce'
import { SketchPicker } from 'react-color'

export default class ConfigurationProjectsForm extends Component {

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
                                label="Titre de la page de propositions"
                                placeholder="1.2em"
                                name="projects_page_header_title"
                                value={configuration.projects_page_header_title}
                                onChange={this.handleConfigurationChange}
                            />
                            <Form.Input
                                label="Hauteur de la bannière de proposition"
                                placeholder="10em"
                                name="project_header_height"
                                value={configuration.project_header_height}
                                onChange={this.handleConfigurationChange}
                            />
                            <Form.Input
                                label="Taille du texte de description"
                                placeholder="10em"
                                name="project_description_font_size"
                                value={configuration.project_description_font_size}
                                onChange={this.handleConfigurationChange}
                            />
                        </Form.Group>

                        <Divider className="opencity-divider" style={{ color: configuration.navbar_color }} section>COULEURS</Divider>
                        <Form.Group>
                            <Form.Field>
                                <label>Couleur du titre de proposition</label>
                                <SketchPicker color={configuration.project_header_color} onChangeComplete={(e) => { this.handleColorChange('project_header_color', e) }} />
                            </Form.Field>
                            <Form.Field>
                                <label>Couleur de fond de la description</label>
                                <SketchPicker color={configuration.project_description_background_color} onChangeComplete={(e) => { this.handleColorChange('project_description_background_color', e) }} />
                            </Form.Field>
                            <Form.Field>
                                <label>Couleur du texte de description</label>
                                <SketchPicker color={configuration.project_description_color} onChangeComplete={(e) => { this.handleColorChange('project_description_color', e) }} />
                            </Form.Field>
                        </Form.Group>
                        <Divider className="opencity-divider" style={{ color: configuration.navbar_color }} section>ANONYMAT</Divider>
                        <Form.Group>
                            <Form.Checkbox
                                checked={configuration.projects_anonymous_choice}
                                onClick={() => this.toggleConfiguration('projects_anonymous_choice')}
                                label={"Les citoyens peuvent choisir l'anonymat"}
                            />
                            <Form.Checkbox
                                checked={configuration.projects_anonymous_default}
                                onClick={() => this.toggleConfiguration('projects_anonymous_default')}
                                label={"Propositions anonymes par défaut"}
                            />
                        </Form.Group>
                        <Button color="green" content="Valider les modifications" />
                    </Form>
                </Grid.Column>
            </Grid>

        )
    }
}