import React, { Component } from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import { Grid, Header, Loader, Form, Input, Item, Container, Button } from 'semantic-ui-react'
import { ExternalApisConfiguration } from '/imports/api/external_apis_configuration/external_apis_configuration'

export class AdminExternalApisPage extends TrackerReact(Component) {

  /*
    required props:
      - none
  */

  constructor(props) {
    super(props);
    this.state = {
      external_apis_configuration: {}
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ external_apis_configuration: props.external_apis_configuration })
  }

  handleExternalConfigChange(attr, e) {
    let { external_apis_configuration } = this.state
    external_apis_configuration[attr] = e.target.value
    this.setState({ external_apis_configuration })
  }

  reset_api_configuration(service, e) {
    e.preventDefault()
    Meteor.call('external_apis_configuration.reset_' + service, (error, result) => {
      if (error) {
        console.log(error)
        Bert.alert({
          title: "Erreur lors de la réinitialisation du service " + service,
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      } else {
        Bert.alert({
          title: "Service " + service + " réinitialisé",
          message: "Les fonctionnalités associées ont été désactivées",
          type: 'success',
          style: 'growl-bottom-left',
        })
      }
    });
  }

  submit_external_services(e) {
    e.preventDefault()
    const {
      amazon_public_key,
      amazon_private_key,
      google_public_key,
      google_private_key,
      facebook_public_key,
      facebook_private_key,
      email_smtp_password,
      email_smtp_port,
      email_smtp_server,
      email_smtp_user,
      email_smtp_from,
      email_smtp_from_domain
    } = this.state.external_apis_configuration

    if (amazon_public_key && amazon_private_key) {
      Meteor.call('external_apis_configuration.amazon_update', { amazon_public_key, amazon_private_key }, (error, result) => {
        if (error) {
          console.log(error)
          Bert.alert({
            title: "Erreur lors de la configuration des apis Amazon",
            message: error.reason,
            type: 'danger',
            style: 'growl-bottom-left',
          })
        } else {
          Bert.alert({
            title: "La configuration des services extérieurs a bien été prise en compte",
            message: "",
            type: 'success',
            style: 'growl-bottom-left',
          })
        }
      })
    }
    if (google_public_key && google_private_key) {
      Meteor.call('external_apis_configuration.google_update', { google_public_key, google_private_key }, (error, result) => {
        if (error) {
          console.log(error)
          Bert.alert({
            title: "Erreur lors de la configuration des apis Google",
            message: error.reason,
            type: 'danger',
            style: 'growl-bottom-left',
          })
        } else {
          Bert.alert({
            title: "La configuration des services extérieurs a bien été prise en compte",
            message: "",
            type: 'success',
            style: 'growl-bottom-left',
          })
        }
      })
    }
    if (facebook_public_key && facebook_private_key) {
      Meteor.call('external_apis_configuration.facebook_update', { facebook_public_key, facebook_private_key }, (error, result) => {
        if (error) {
          console.log(error)
          Bert.alert({
            title: "Erreur lors de la configuration des apis Facebook",
            message: error.reason,
            type: 'danger',
            style: 'growl-bottom-left',
          })
        } else {
          Bert.alert({
            title: "La configuration des services extérieurs a bien été prise en compte",
            message: "",
            type: 'success',
            style: 'growl-bottom-left',
          })
        }
      })
    }

    if (email_smtp_port && email_smtp_server && email_smtp_user && email_smtp_from && email_smtp_from_domain) {
      Meteor.call('external_apis_configuration.email_smtp_update', { email_smtp_password, email_smtp_port, email_smtp_server, email_smtp_user, email_smtp_from, email_smtp_from_domain }, (error, result) => {
        if (error) {
          console.log(error)
          Bert.alert({
            title: "Erreur lors de la configuration des apis SMTP",
            message: error.reason,
            type: 'danger',
            style: 'growl-bottom-left',
          })
        } else {
          Bert.alert({
            title: "La configuration de votre serveur email a été prise en compte",
            message: "Certaines fonctionnalités d'emailing ont été activées. Vous pouvez les désactivées dans le panneau de configuration",
            type: 'success',
            style: 'growl-bottom-left',
          })
        }
      })
    }
  }

  render() {
    const { loading } = this.props
    const { external_apis_configuration } = this.state
    const { facebook_connected, google_connected, amazon_connected } = Session.get('global_configuration')

    if (!loading) {
      return (
        <Grid stackable>
          <Grid.Column width={16} className="center-align">
            <Header as="h1">Configuration des services extérieurs</Header>
            <p>Pour des raisons de sécurité, les clés privées ne sont jamais affichées. Vous pouvez cependant les modifier.</p>
          </Grid.Column>
          <Grid.Column width={16}>
            <Grid centered>
              <Container>
                <Grid.Column width={16} className="left-align">
                  <Item.Group>
                    <Item className="animated fadeInUp">
                      <Item.Image size='tiny' src='/images/external_services_logos/google.svg.png' />

                      <Item.Content>
                        <Item.Header as='a'>Connexion Google</Item.Header>
                        <Item.Description>
                          <Form.Group>
                            <Input placeholder="**********" label="Clé privée" value={external_apis_configuration.google_private_key} type="text" onChange={(e) => { this.handleExternalConfigChange('google_private_key', e) }} />
                            <Input placeholder="**********" label="Clé publique" value={external_apis_configuration.google_public_key} type="text" onChange={(e) => { this.handleExternalConfigChange('google_public_key', e) }} />
                          </Form.Group>
                          {google_connected ?
                            <Button color="red" inline onClick={(e) => { this.reset_api_configuration('google', e) }}>Réinitialiser</Button>
                            : ''}
                        </Item.Description>
                      </Item.Content>
                    </Item>

                    <Item className="animated fadeInUp">
                      <Item.Image size='tiny' src='/images/external_services_logos/facebook.png' />

                      <Item.Content>
                        <Item.Header as='a'>Connexion Facebook</Item.Header>
                        <Item.Description>
                          <Form.Group>
                            <Input placeholder="**********" label="Clé privée" value={external_apis_configuration.facebook_private_key} type="text" onChange={(e) => { this.handleExternalConfigChange('facebook_private_key', e) }} />
                            <Input placeholder="**********" label="Clé publique" value={external_apis_configuration.facebook_public_key} type="text" onChange={(e) => { this.handleExternalConfigChange('facebook_public_key', e) }} />
                          </Form.Group>
                          {facebook_connected ?
                            <Button color="red" onClick={(e) => { this.reset_api_configuration('facebook', e) }}>Réinitialiser</Button>
                            : ''}
                        </Item.Description>
                      </Item.Content>
                    </Item>
                    <Item className="animated fadeInUp">
                      <Item.Image size='tiny' src='/images/external_services_logos/amazonS3.png' />

                      <Item.Content>
                        <Item.Header as='a'>Stockage de documents Amazon</Item.Header>
                        <Item.Description>
                          <Form.Group>
                            <Input placeholder="**********" label="Clé privée" value={external_apis_configuration.amazon_private_key} type="text" onChange={(e) => { this.handleExternalConfigChange('amazon_private_key', e) }} />
                            <Input placeholder="**********" label="Clé publique" value={external_apis_configuration.amazon_public_key} type="text" onChange={(e) => { this.handleExternalConfigChange('amazon_public_key', e) }} />
                          </Form.Group>
                          {amazon_connected ?
                            <Button color="red" onClick={(e) => { this.reset_api_configuration('amazon', e) }}>Réinitialiser</Button>
                            : ''}
                        </Item.Description>
                      </Item.Content>
                    </Item>
                    <Item className="animated fadeInUp">
                      <Item.Image size='tiny' src='/images/external_services_logos/email.png' />

                      <Item.Content>
                        <Item.Header as='a'>Envoi d'emails</Item.Header>
                        <Item.Description>
                          <Form>
                            <Form.Group widths="equal">
                              <Input placeholder="Username" label="Compte SMTP (nom d'utilisateur)" value={external_apis_configuration.email_smtp_user} type="text" onChange={(e) => { this.handleExternalConfigChange('email_smtp_user', e) }} />
                              <Input placeholder="ex: smtp.mandrill.com" label="Serveur SMTP" value={external_apis_configuration.email_smtp_server} type="text" onChange={(e) => { this.handleExternalConfigChange('email_smtp_server', e) }} />
                              <Input placeholder="587" label="Port SMTP" value={external_apis_configuration.email_smtp_port} type="text" onChange={(e) => { this.handleExternalConfigChange('email_smtp_port', e) }} />
                            </Form.Group>
                            <Form.Group widths="equal">
                              <Input placeholder="********" label="Mot de passe SMTP" value={external_apis_configuration.email_smtp_password} type="password" onChange={(e) => { this.handleExternalConfigChange('email_smtp_password', e) }} />
                              <Input placeholder="contact@votreopencity.com" label="Adresse d'envoi" value={external_apis_configuration.email_smtp_from} type="text" onChange={(e) => { this.handleExternalConfigChange('email_smtp_from', e) }} />
                              <Input placeholder="https://votreopencity.com" label="Domaine d'envoi" value={external_apis_configuration.email_smtp_from_domain} type="text" onChange={(e) => { this.handleExternalConfigChange('email_smtp_from_domain', e) }} />
                            </Form.Group>
                          </Form>
                          {amazon_connected ?
                            <Button color="red" onClick={(e) => { this.reset_api_configuration('amazon', e) }}>Réinitialiser</Button>
                            : ''}
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Grid.Column>
                <Grid.Column width={16} className="center-align">
                  <Button onClick={(e) => { this.submit_external_services(e) }} positive>Configurer les services</Button>
                </Grid.Column>
              </Container>
            </Grid>
          </Grid.Column>
        </Grid>
      )
    } else {
      return <Loader className="inline-block">Chargement de la configuration</Loader>
    }
  }
}

export default AdminExternalApisPageContainer = createContainer(() => {
  const externalApisConfigurationPublication = Meteor.isClient && Meteor.subscribe('external_apis_configuration.admin')
  const loading = Meteor.isClient && !externalApisConfigurationPublication.ready()
  const external_apis_configuration = ExternalApisConfiguration.findOne({})
  return {
    loading,
    external_apis_configuration
  }
}, AdminExternalApisPage)
