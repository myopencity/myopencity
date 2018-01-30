import React, { Component } from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { Grid, Header, Container, Button, Icon, Menu } from 'semantic-ui-react'
import { SketchPicker } from 'react-color'
import TinyMCE from 'react-tinymce'
import ConfigurationGeneralForm from '/imports/components/admin/ConfigurationGeneralForm'
import ConfigurationLandingForm from '/imports/components/admin/ConfigurationLandingForm'
import ConfigurationNavbarForm from '/imports/components/admin/ConfigurationNavbarForm'
import ConfigurationConsultsForm from '/imports/components/admin/ConfigurationConsultsForm'
import ConfigurationProjectsForm from '/imports/components/admin/ConfigurationProjectsForm'
import ConfigurationFooterForm from '/imports/components/admin/ConfigurationFooterForm'

export default class AdminConfigurationPage extends TrackerReact(Component) {

  /*
    required props:
      - none
  */

  state = {
    part: "general" // general / consults / projects / navbar / landing / footer
  }

  componentWillMount() {
    this.state.configuration = Meteor.isClient && Session.get('global_configuration')
  }


  handleColorChange(attr, color, e) {
    let { configuration } = this.state
    configuration[attr] = color.hex
    this.setState({ configuration })
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

  changePart = (part) => this.setState({ part })

  submit_configuration(e) {
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

  handleLandingExplainChange(e) {
    let { configuration } = this.state
    configuration.landing_explain_text = e.target.getContent()
    this.setState({ configuration })
  }

  render() {
    const { part } = this.state


    return (
      <Grid stackable className="admin-page">
        <Container>
          <Grid.Column width={16} style={{padding: "3em 0 0"}} >
            <Header as="h1" className="wow fadeInLeft">Configuration de votre OpenCity</Header>
          </Grid.Column>
          <Grid.Column width={16} className="admin-form-container">
            <Menu pointing secondary>
              <Menu.Item active={part === 'general'} onClick={() => this.changePart('general')} >
                <Icon name="settings" />
                Général
          </Menu.Item>
              <Menu.Item active={part === 'landing'} onClick={() => this.changePart('landing')} >
                <Icon name="home" />
                Page d'accueil
          </Menu.Item>
              <Menu.Item active={part === 'navbar'} onClick={() => this.changePart('navbar')} >
                <Icon name="browser" />
                Navigation
          </Menu.Item>
              <Menu.Item active={part === 'consults'} onClick={() => this.changePart('consults')} >
                <Icon name="retweet" />
                Consultations
          </Menu.Item>
          <Menu.Item active={part === 'projects'} onClick={() => this.changePart('projects')} >
                <Icon name="retweet" />
                Propositions
          </Menu.Item>
          <Menu.Item active={part === 'footer'} onClick={() => this.changePart('footer')} >
                <Icon name="quote left" />
                Footer / CGU
          </Menu.Item>
            </Menu>
            {part == 'general' &&
              [
                <Header as='h3'>Paramètres généraux</Header>,
                <ConfigurationGeneralForm className="wow fadeInDown" />
              ]
            }
            {part == 'landing' &&
              [
                <Header as='h3'>Page d'accueil</Header>,
                <ConfigurationLandingForm className="wow fadeInDown" />
              ]
            }
            {part == 'navbar' &&
              [
                <Header as='h3'>Barre de navigation</Header>,
                <ConfigurationNavbarForm className="wow fadeInDown" />
              ]
            }
            {part == 'consults' &&
              [
                <Header as='h3'>Consultations</Header>,
                <ConfigurationConsultsForm className="wow fadeInDown" />
              ]
            }
            {part == 'projects' &&
              [
                <Header as='h3'>Propositions citoyennes</Header>,
                <ConfigurationProjectsForm className="wow fadeInDown" />
              ]
            }
            {part == 'footer' &&
              [
                <Header as='h3'>Footer / Conditions d'utilisation</Header>,
                <ConfigurationFooterForm className="wow fadeInDown" />
              ]
            }
          </Grid.Column>
        </Container>
      </Grid>
    )
  }
}
