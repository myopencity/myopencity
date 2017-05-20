import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Header, Form, Input, Loader, Container, Button} from 'semantic-ui-react'

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

  handleConfigurationChange(attr, e){
    let configuration = this.state.configuration
    configuration[attr] = e.target.value
    this.setState({configuration: configuration})
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

  render(){
    const conf = this.state.configuration

    if(conf){

      return(
        <Grid stackable>
          <Grid.Column width={16} className="center-align">
            <Header as="h1">Configuration de votre OpenCity</Header>
          </Grid.Column>
          <Grid.Column width={16}>
            <Container>
              <Form onSubmit={(e) => {this.submit_configuration(e)}}>
                <Header as="h3">Textes généraux</Header>
                <Form.Field>
                  <label>Nom de votre espace (nom du territoire)</label>
                  <Input type="text" value={conf.main_title} onChange={(e) => {this.handleConfigurationChange('main_title', e)}} />
                </Form.Field>
                <Form.Field>
                  <label>Phrase d'accroche</label>
                  <Input type="text" value={conf.landing_header_description} onChange={(e) => {this.handleConfigurationChange('landing_header_description', e)}} />
                </Form.Field>
                <Header as="h3">Page d'accueil</Header>
                <Form.Field>
                  <label>URL de l'image d'arrière plan sur la page d'accueil</label>
                  <Input type="text" value={conf.landing_header_background_url} onChange={(e) => {this.handleConfigurationChange('landing_header_background_url', e)}} />
                </Form.Field>
                <Form.Field>
                  <label>Titre de la page d'accueil</label>
                  <Input type="text" value={conf.landing_main_title} onChange={(e) => {this.handleConfigurationChange('landing_main_title', e)}} />
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
