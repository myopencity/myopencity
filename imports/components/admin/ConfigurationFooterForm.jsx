import React, { Component } from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import { Grid, Form, Input, Checkbox, Divider, Button, Card, Image, Header, Item } from 'semantic-ui-react'
import TinyMCE from 'react-tinymce'
import { SketchPicker } from 'react-color'

export default class ConfigurationFooterForm extends Component {

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

    handleRichContent = (e, attr) => {
        let { configuration } = this.state
        configuration[attr] = e.target.getContent()
        this.setState({ configuration })
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

    handleColorChange = (attr, color, e) => {
        let { configuration } = this.state
        configuration[attr] = color.hex
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
            <Grid stackable {...this.props} >
                <Grid.Column width={16}>
                    <Form onSubmit={this.submit_form}>
                        <Form.Checkbox
                            checked={configuration.footer_display}
                            onClick={() => this.toggleConfiguration('footer_display')}
                            label="Afficher le footer"
                        />
                        <Divider className="opencity-divider" style={{ color: configuration.navbar_color }} section>Termes du footer</Divider>
                        <Form.Group widths="equal">
                            <Form.Input
                                label="Contenu du footer"
                                placeholder="Développé par Myopencity"
                                name="footer_content"
                                value={configuration.footer_content}
                                onChange={this.handleConfigurationChange}
                            />
                            <Form.Input
                                label="Terme pour 'conditions d'utilisation' "
                                placeholder="ex: Conditions générales / Mentions légales"
                                name="cgu_term"
                                value={configuration.cgu_term}
                                onChange={this.handleConfigurationChange}
                            />
                            <Form.Input
                                label="Hauteur du footer"
                                placeholder="ex: 10em"
                                name="footer_height"
                                value={configuration.footer_height}
                                onChange={this.handleConfigurationChange}
                            />
                        </Form.Group>
                        <Divider className="opencity-divider" style={{ color: configuration.navbar_color }} section>COULEURS</Divider>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Couleur de l'écriture du footer</label>
                                <SketchPicker color={configuration.footer_color} onChangeComplete={(e) => { this.handleColorChange('footer_color', e) }} />
                            </Form.Field>
                            <Form.Field>
                                <label>Couleur de fond du footer</label>
                                <SketchPicker color={configuration.footer_background_color} onChangeComplete={(e) => { this.handleColorChange('footer_background_color', e) }} />
                            </Form.Field>
                        </Form.Group>
                        <Divider className="opencity-divider" style={{ color: configuration.navbar_color }} section>CONDITIONS D'UTILISATION</Divider>
                        <Form.Checkbox
                            checked={configuration.footer_cgu_display}
                            onClick={() => this.toggleConfiguration('footer_cgu_display')}
                            label="Afficher le bouton des conditions dans le footer"
                        />
                        <Form.Field width={16}>
                            <label>Conditions générales d'utilisation</label>
                            <TinyMCE
                                content={configuration.cgu}
                                config={{
                                    plugins: 'image autoresize',
                                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | formatselect'
                                }}
                                onChange={(e) => this.handleRichContent(e, 'cgu')}
                                name="cgu"
                            />
                        </Form.Field>
                        <Button color="green" content="Valider les modifications" />
                    </Form>
                </Grid.Column>
            </Grid>

        )
    }
}