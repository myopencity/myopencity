import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Header, Form, Input, Loader, Container, Button, Checkbox} from 'semantic-ui-react'
import { SketchPicker } from 'react-color'
import TinyMCE from 'react-tinymce'

export default class AdminConfigurationPage extends TrackerReact(Component){

  /*
    required props:
      - none
  */

  constructor(props){
    super(props);
    this.state = {
      configuration: {}
    }
  }

  componentWillMount(){
    this.state.configuration = Session.get('global_configuration')
  }

  toggleConfiguration(attr, e){
    let {configuration} = this.state
    configuration[attr] = !configuration[attr]
    this.setState({configuration})
  }

  handleConfigurationChange(attr, e){
    let {configuration} = this.state
    configuration[attr] = e.target.value
    this.setState({configuration})
  }

  handleColorChange(attr, color, e){
    let {configuration} = this.state
    configuration[attr] = color.hex
    this.setState({configuration})
  }

  submit_configuration(e){
    e.preventDefault()
    Meteor.call('configuration.update', this.state.configuration, (error, result) => {
      if(error){
        console.log("Configuration update error", error)
        Bert.alert({
          title: "Erreur lors de la modification de la configuration",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        Bert.alert({
          title: "La configuration a bien été modifiée",
          type: 'success',
          style: 'growl-bottom-left',
        })
      }
    })
  }

  handleLandingExplainChange(e){
    let {configuration} = this.state
    configuration.landing_explain_text = e.target.getContent()
    this.setState({configuration})
  }

  render(){
    const {configuration} = this.state

    if(configuration){

      return(
        <Grid stackable className="wow fadeInLeft">
          <Grid.Column width={16} className="center-align">
            <Header as="h1">Configuration de votre OpenCity</Header>
          </Grid.Column>
          <Grid.Column width={16}>
            <Container>
              <Form onSubmit={(e) => {this.submit_configuration(e)}}>
                <Header as="h3">Barre de navigation</Header>
                <Form.Field>
                  <label>Nom de votre espace (nom du territoire)</label>
                  <Input type="text" value={configuration.main_title} onChange={(e) => {this.handleConfigurationChange('main_title', e)}} />
                </Form.Field>
                <Form.Field>
                  <label>Couleur de la barre de navigation</label>
                  <SketchPicker color={configuration.navbar_color} onChangeComplete={(e) => {this.handleColorChange('navbar_color', e)}} />
                </Form.Field>
                <Header as="h3">Page d'accueil</Header>
                <Form.Field>
                  <label>Titre principal de la page d'accueil</label>
                  <Input type="text" value={configuration.landing_main_title} onChange={(e) => {this.handleConfigurationChange('landing_main_title', e)}} />
                </Form.Field>
                <Form.Field>
                  <label>Phrase d'accroche</label>
                  <Input type="text" value={configuration.landing_header_description} onChange={(e) => {this.handleConfigurationChange('landing_header_description', e)}} />
                </Form.Field>
                <Form.Field>
                  <label>URL de l'image d'arrière plan sur la page d'accueil</label>
                  <Input type="text" value={configuration.landing_header_background_url} onChange={(e) => {this.handleConfigurationChange('landing_header_background_url', e)}} />
                </Form.Field>
                <Form.Field>
                  <label>Couleur de la phrase d'accroche</label>
                  <SketchPicker color={configuration.landing_header_description_color} onChangeComplete={(e) => {this.handleColorChange('landing_header_description_color', e)}} />
                </Form.Field>
                <Form.Field>
                  <label>Couleur de fonds de la partie "consultations du moment"</label>
                  <SketchPicker color={configuration.landing_consults_background_color} onChangeComplete={(e) => {this.handleColorChange('landing_consults_background_color', e)}} />
                </Form.Field>
                <Form.Field>
                  <label>Texte d'explication de la page d'accueil</label>
                  <TinyMCE
                    content={configuration.landing_explain_text}
                    config={{
                      plugins: 'image autoresize',
                      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | formatselect'
                    }}
                    onChange={this.handleLandingExplainChange.bind(this)}
                    />
                </Form.Field>
                <Header as="h3">Consultation</Header>
                <Form.Field>
                  <label>Hauteur de la bannière de consultation</label>
                  <Input type="text" value={configuration.consult_header_height} onChange={(e) => {this.handleConfigurationChange('consult_header_height', e)}} />
                </Form.Field>
                <Form.Field className="inline-block">
                  <label>Couleur des titres de consultation</label>
                  <SketchPicker color={configuration.consult_header_color} onChangeComplete={(e) => {this.handleColorChange('consult_header_color', e)}} />
                </Form.Field>
                <Form.Field className="inline-block">
                  <label>Couleur du fond de description</label>
                  <SketchPicker color={configuration.consult_description_background_color} onChangeComplete={(e) => {this.handleColorChange('consult_description_background_color', e)}} />
                </Form.Field>
                <Form.Field className="inline-block">
                  <label>Couleur du texte de description</label>
                  <SketchPicker color={configuration.consult_description_color} onChangeComplete={(e) => {this.handleColorChange('consult_description_color', e)}} />
                </Form.Field>
                <Form.Field>
                  <label>Taille du texte de description</label>
                  <Input type="text" value={configuration.consult_description_font_size} onChange={(e) => {this.handleConfigurationChange('consult_description_font_size', e)}} />
                </Form.Field>
                <Header as="h3">Alternatives</Header>
                <Form.Field className="inline-block">
                  <label>Couleur de l'icone des soutiens</label>
                  <SketchPicker color={configuration.alternative_like_icon_color} onChangeComplete={(e) => {this.handleColorChange('alternative_like_icon_color', e)}} />
                </Form.Field>
                <Form.Field>
                  <label>Terme pour les soutiens d'alternatives</label>
                  <Input type="text" value={configuration.alternative_likes_term} onChange={(e) => {this.handleConfigurationChange('alternative_likes_term', e)}} />
                </Form.Field>
                <Header as="h3">Propositions</Header>
                <Form.Field>
                  <label>Titre de la page des propositions</label>
                  <Input type="text" value={configuration.projects_page_header_title} onChange={(e) => {this.handleConfigurationChange('projects_page_header_title', e)}} />
                </Form.Field>
                <Header as="h3">Configuration de l'anonymat</Header>
                <Form.Field>
                  <label>Choix de l'anonymat des alternatives (actuellement {configuration.alternatives_anonymous_choice ? "actif" : "désactivé"})</label> 
                  <Checkbox checked={configuration.alternatives_anonymous_choice} onClick={(e) => {this.toggleConfiguration('alternatives_anonymous_choice', e)}} toggle />
                </Form.Field>
                <Form.Field>
                  <label>Valeur par défaut de l'anonymat des alternatives (actuellement {configuration.alternatives_anonymous_default ? "anonyme" : "non anonyme"} par défaut)</label>
                  <Checkbox checked={configuration.alternatives_anonymous_default} onClick={(e) => {this.toggleConfiguration('alternatives_anonymous_default', e)}} toggle />
                </Form.Field>
                <Form.Field>
                  <label>Choix de l'anonymat des propositions (actuellement {configuration.projects_anonymous_choice ? "actif" : "désactivé"})</label>
                  <Checkbox checked={configuration.projects_anonymous_choice} onClick={(e) => {this.toggleConfiguration('projects_anonymous_choice', e)}} toggle />
                </Form.Field>
                <Form.Field>
                  <label>Valeur par défaut de l'anonymat des alternatives (actuellement {configuration.projects_anonymous_default ? "anonyme" : "non anonyme"} par défaut)</label>
                  <Checkbox checked={configuration.projects_anonymous_default} onClick={(e) => {this.toggleConfiguration('projects_anonymous_default', e)}} toggle />
                </Form.Field>
                <Button positive>Modifier la configuration</Button>
              </Form>
            </Container>
          </Grid.Column>
        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement de la configuration</Loader>
    }
  }
}
