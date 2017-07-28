import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Header, Input, Form, Container, Button, Icon, Image, Item} from 'semantic-ui-react'

export default class InitialConfigPage extends TrackerReact(Component){

  /*
    required props:
      - none
  */

  constructor(props){
    super(props);
    this.state = {
      config: {
        initial_configuration: false
      },
      external_config: {},
      step: 'account', // 'account' / 'city' / 'punchline' / 'color' / 'external_services'
      user: {},
      external_services: []
    }
  }

  handleConfigChange(attr, e){
    let config = this.state.config
    config[attr] = e.target.value
    this.setState({config: config})
  }

  handleUserChange(attr, e){
    let user = this.state.user
    user[attr] = e.target.value
    this.setState({user: user})
  }

  stepChange(value, e){
    e.preventDefault()
    this.setState({step: value})
  }

  handleExternalConfigChange(attr, e){
    let {external_config} = this.state
    external_config[attr] = e.target.value
    this.setState({external_config})
  }

  toggleExternalService(service){
    let {external_services} = this.state
    const index = _.indexOf(external_services, service)
    console.log("INDEX SERVICE", index);

    if(index == -1){
      external_services.push(service)
    }else{
      external_services.splice(index, 1)
    }
    this.setState({external_services})
  }

  go(route, e){
    e.preventDefault()
    FlowRouter.go(route)
  }

  create_user(e){
    e.preventDefault()
    console.log("user creation");
    const that = this

    Meteor.call('user.init_creation', this.state.user, (error, result) => {
      if(error){
        Bert.alert({
          title: "Erreur lors de la création du compte administrateur",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        Meteor.loginWithPassword(this.state.user.email, this.state.user.password)
        that.setState({step: 'city'})
      }
    })
  }

  submit_configuration(e){
    e.preventDefault()
    const {config} = this.state
    config.landing_main_title = config.main_title
    Meteor.call('configuration.update', config, (error, result) => {
      if(error){
        Bert.alert({
          title: "Erreur lors de la configuration",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        this.stepChange('external_services', e)
      }
    })
  }

  submit_external_services(e){
    e.preventDefault()
    const {amazon_public_key, amazon_private_key, google_public_key, google_private_key, facebook_public_key, facebook_private_key} = this.state.external_config
    if(amazon_public_key && amazon_private_key){
      Meteor.call('external_apis_configuration.amazon_update', {amazon_public_key, amazon_private_key} , (error, result) => {
        if(error){
          console.log(error)
          Bert.alert({
            title: "Erreur lors de la configuration des apis extérieures",
            message: error.reason,
            type: 'danger',
            style: 'growl-bottom-left',
          })
        }else{
          Bert.alert({
            title: "La configuration des services extérieurs a bien été prise en compte",
            message: "",
            type: 'success',
            style: 'growl-bottom-left',
          })
        }
      })
    }
    if(google_public_key && google_private_key){
      Meteor.call('external_apis_configuration.google_update', {google_public_key, google_private_key} , (error, result) => {
        if(error){
          console.log(error)
          Bert.alert({
            title: "Erreur lors de la configuration des apis extérieures",
            message: error.reason,
            type: 'danger',
            style: 'growl-bottom-left',
          })
        }else{
          Bert.alert({
            title: "La configuration des services extérieurs a bien été prise en compte",
            message: "",
            type: 'success',
            style: 'growl-bottom-left',
          })
        }
      })
    }
    if(facebook_public_key && facebook_private_key){
      Meteor.call('external_apis_configuration.facebook_update', {facebook_public_key, facebook_private_key} , (error, result) => {
        if(error){
          console.log(error)
          Bert.alert({
            title: "Erreur lors de la configuration des apis extérieures",
            message: error.reason,
            type: 'danger',
            style: 'growl-bottom-left',
          })
        }else{
          Bert.alert({
            title: "La configuration des services extérieurs a bien été prise en compte",
            message: "",
            type: 'success',
            style: 'growl-bottom-left',
          })
        }
      })
    }
    FlowRouter.redirect('/')
  }

  render(){
    const {step, external_services, external_config} = this.state
    const background_url = "url(" + this.state.config.landing_header_background_url + ")"

    return(
      <Grid className="init-config-container" centered stackable style={{backgroundImage: this.state.step == 'color' ? background_url : ''}}>
        <Container>
          <Grid.Column width={16}>
            <Grid verticalAlign="middle" className="init-config-container">
              {step == 'account' ?
                <Grid.Column width={16} className="center-align">
                  <Header className="wow fadeInUp"  as="h1">Premièrement, créeons votre compte administrateur</Header>
                  <Form onSubmit={(e) => {this.create_user(e)}} className="wow fadeInUp" data-wow-delay="1s">
                    <Input fluid type="text" placeholder="Votre nom d'utilisateur" size="huge" onChange={(e) => {this.handleUserChange('username', e)}}/><br/>
                    <Input fluid type="email"  placeholder="Votre email" size="huge" onChange={(e) => {this.handleUserChange('email', e)}}/><br/>
                    <Input fluid type="password" placeholder="Votre mot de passe administrateur" size="huge" onChange={(e) => {this.handleUserChange('password', e)}}/><br/>
                    <Input fluid type="password" placeholder="Confirmez-votre mot de passe" size="huge" onChange={(e) => {this.handleUserChange('confirm_password', e)}}/><br/>
                    <Button size="big">Créer mon compte</Button>
                  </Form>
                </Grid.Column>
                : ''}
              {step == 'city' ?
                <Grid.Column width={16} className="center-align">
                  <Header className="wow fadeInUp"  as="h3"><Icon color="green" name="check circle" /> Votre compte administrateur a bien été créé</Header>
                  <Header className="wow fadeInUp"  as="h1">Maintenant, quel est le nom de la ville ou du territoire concerné par ce Myopencity ?</Header>
                  <Form onSubmit={(e) => {this.stepChange('punchline', e)}}>
                    <Input fluid type="text" className="wow fadeInUp" focus={true} placeholder="ex: Paris" data-wow-delay="1s" size="huge" onChange={(e) => {this.handleConfigChange('main_title', e)}}/>
                  </Form>
                </Grid.Column>
                : ''}
                {step == 'punchline' ?
                  <Grid.Column width={16} className="center-align">
                    <Header className="wow fadeInUp"  as="h1">Parfait. Quelle phrase d'accroche souhaitez-vous afficher sur la page d'accueil ?</Header>
                    <Form onSubmit={(e) => {this.stepChange('color', e)}}>
                      <Input type="text" fluid className="wow fadeInUp" focus={true} placeholder="ex: Participez à tous les projets de la ville" data-wow-delay="1s" size="huge" onChange={(e) => {this.handleConfigChange('landing_header_description', e)}}/>
                    </Form>
                  </Grid.Column>
                  : ''}
                {step == 'color' ?
                  <Grid.Column width={16} className="center-align">
                    <Header className="wow fadeInUp" as="h1">Ajoutons un peu de couleurs à votre espace ! </Header>
                    <Header className="wow fadeInUp" data-wow-delay="1s" as="h3">Entrez l'URL d'une image que vous souhaitez en fond de votre page d'accueil</Header>
                    <p className="wow fadeInUp" data-wow-delay="2s">(Attention, les images doivent être libres de droit, ou vous appartenir)</p>

                    <Form onSubmit={(e) => {this.submit_configuration(e)}} >
                      <Input type="text" fluid className="wow fadeInUp" focus={true} placeholder="ex: http://" data-wow-delay="3s" size="huge" onChange={(e) => {this.handleConfigChange('landing_header_background_url', e)}}/>
                    </Form>
                  </Grid.Column>
                  : ''}
                {step == 'external_services' ?
                  <Grid.Column width={16}>
                    <Grid>
                      <Grid.Column width={16} className="center-align">
                        <Header as="h2">Activez des services extérieurs</Header>
                      </Grid.Column>
                      <Grid.Column width={16} className="left-align">
                        <Item.Group>
                          <Item>
                            <Item.Image size='tiny' src='/images/external_services_logos/google.svg.png' />

                            <Item.Content>
                              <Item.Header as='a'>Activer la connexion Google</Item.Header>
                              <Item.Meta>Nécessite des clés d'API Google</Item.Meta>
                              <Item.Description>
                                {_.indexOf(external_services, 'google') > -1 ?
                                  <Form.Group>
                                      <Input label="Clé privée" value={external_config.google_private_key} type="text" onChange={(e) => {this.handleExternalConfigChange('google_private_key', e)}} />
                                      <Input label="Clé publique" value={external_config.google_public_key} type="text" onChange={(e) => {this.handleExternalConfigChange('google_public_key', e)}} />
                                  </Form.Group>
                                :
                                  <p>Déclarer votre Opencity via Google vous permet d'autoriser la connexion de vos utilisateurs via leur compte Google</p>
                                }
                                <Button positive={_.indexOf(external_services, 'google') > -1} onClick={(e) => {this.toggleExternalService('google', e)}}>{_.indexOf(external_services, 'google') > -1 ? 'Désactiver' : 'Activer'}</Button>
                              </Item.Description>
                              <Item.Extra>Plus d'infos</Item.Extra>
                            </Item.Content>
                          </Item>

                          <Item>
                            <Item.Image size='tiny' src='/images/external_services_logos/facebook.png' />

                            <Item.Content>
                              <Item.Header as='a'>Activer la connexion Facebook</Item.Header>
                              <Item.Meta>Nécessite des clés d'API Facebook</Item.Meta>
                              <Item.Description>
                                {_.indexOf(external_services, 'facebook') > -1 ?
                                  <Form.Group>
                                      <Input label="Clé privée" value={external_config.facebook_private_key} type="text" onChange={(e) => {this.handleExternalConfigChange('facebook_private_key', e)}} />
                                      <Input label="Clé publique" value={external_config.facebook_public_key} type="text" onChange={(e) => {this.handleExternalConfigChange('facebook_public_key', e)}} />
                                  </Form.Group>
                                :
                                  <p>Déclarer votre Opencity via Facebook vous permet d'autoriser la connexion de vos utilisateurs via leur compte Facebook</p>
                                }
                                <Button positive={_.indexOf(external_services, 'facebook') > -1} onClick={(e) => {this.toggleExternalService('facebook', e)}}>{_.indexOf(external_services, 'facebook') > -1 ? 'Désactiver' : 'Activer'}</Button>
                              </Item.Description>
                              <Item.Extra>Plus d'infos</Item.Extra>
                            </Item.Content>
                          </Item>
                          <Item>
                            <Item.Image size='tiny' src='/images/external_services_logos/amazonS3.png' />

                            <Item.Content>
                              <Item.Header as='a'>Activer le stockage de documents Amazon</Item.Header>
                              <Item.Meta>Nécessite des clés d'API Amazon</Item.Meta>
                              <Item.Description>
                                {_.indexOf(external_services, 'amazon') > -1 ?
                                  <Form.Group>
                                      <Input label="Clé privée" value={external_config.amazon_private_key} type="text" onChange={(e) => {this.handleExternalConfigChange('amazon_private_key', e)}} />
                                      <Input label="Clé publique" value={external_config.amazon_public_key} type="text" onChange={(e) => {this.handleExternalConfigChange('amazon_public_key', e)}} />
                                  </Form.Group>
                                :
                                  <p>Grâce au service Amazon S3, tous les documents (images, word, excel, pdf...) que vous afficherez sur votre Opencity seront stockés sur un serveur Amazon S3. Cela vous permet d'économiser de l'espace de stockage sur votre serveur, et donc de rendre votre Opencity plus rapide.</p>
                                }
                                <Button positive={_.indexOf(external_services, 'amazon') > -1} onClick={(e) => {this.toggleExternalService('amazon', e)}}>{_.indexOf(external_services, 'amazon') > -1 ? 'Désactiver' : 'Activer'}</Button>
                              </Item.Description>
                              <Item.Extra>Plus d'infos</Item.Extra>
                            </Item.Content>
                          </Item>
                        </Item.Group>
                      </Grid.Column>
                      <Grid.Column width={16} className="center-align">
                        {external_services.length > 0 ?
                          <Button positive onClick={(e) => {this.submit_external_services(e)}}>Configurer les services</Button>
                        : ''}
                        <Button size="small">Passer</Button>
                      </Grid.Column>

                    </Grid>

                  </Grid.Column>
                : ''}
                {step == 'amazon' ?
                  <Grid.Column width={16} className="center-align">
                    <Image className="wow fadeInUp" data-wow-delay="0.5s" size="small" inline src="https://servmask.com/img/products/s3.png" />
                    <Header className="wow fadeInUp" as="h1">Ajoutez une clé Amazon S3</Header>
                    <Header className="wow fadeInUp" data-wow-delay="1s" as="h3">Un compte amazon S3 vous permet de stocker des documents sur le Cloud Amazon <br/>et ainsi économiser de l'espace de stockage sur votre serveur.</Header>
                    <p className="wow fadeInUp" data-wow-delay="2s">Pour en savoir plus, consultez <a href="https://aws.amazon.com/fr/getting-started/tutorials/backup-files-to-amazon-s3/">cette page</a></p>

                    <Form onSubmit={(e) => {this.submit_amazon_configuration(e)}} >
                      <Input focus type="text" fluid className="wow fadeInUp" focus={true} placeholder="Clé publique Amazon S3" data-wow-delay="3s" size="huge" onChange={(e) => {this.handleExternalConfigChange('amazon_public_key', e)}}/>
                      <Input type="text" fluid className="wow fadeInUp" focus={true} placeholder="Clé privée Amazon S3" data-wow-delay="3.25s" size="huge" onChange={(e) => {this.handleExternalConfigChange('amazon_private_key', e)}}/>
                      <Button onClick={(e) => {this.submit_amazon_configuration(e)}} positive>Configurer Amazon S3</Button>
                      <Button size="small" onClick={(e) => {this.go('Landing', e)}}>Passer</Button>
                    </Form>
                  </Grid.Column>
                  : ''}
                </Grid>
              </Grid.Column>
        </Container>
      </Grid>
    )
  }
}
