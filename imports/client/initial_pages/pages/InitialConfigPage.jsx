import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Header, Input, Form, Container, Button, Icon, Image} from 'semantic-ui-react'

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
      step: 'account', // 'account' / 'city' / 'punchline' / 'color' / 'amazon'
      user: {}
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
        this.stepChange('amazon', e)
      }
    })
  }

  submit_amazon_configuration(e){
    e.preventDefault()
    const {amazon_public_key, amazon_private_key} = this.state.external_config
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
        FlowRouter.redirect('/')
      }
    });
  }

  render(){
    const {step} = this.state
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
