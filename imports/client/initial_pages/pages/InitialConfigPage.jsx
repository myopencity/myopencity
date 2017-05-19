import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Header, Input, Form, Container} from 'semantic-ui-react'

export default class InitialConfigPage extends TrackerReact(Component){

  /*
    required props:
      - none
  */

  constructor(props){
    super(props);
    this.state = {
      config: {},
      step: 0
    }
  }

  handleConfigChange(attr, e){
    let config = this.state.config
    config[attr] = e.target.value
    this.setState({config: config})
  }

  stepChange(value, e){
    e.preventDefault()
    this.setState({step: value})
  }

  submit_configuration(e){
    e.preventDefault()
    Meteor.call('configuration.update', this.state.config, (error, result) => {
      if(error){
        Bert.alert({
          title: "Erreur lors de la configuration",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        FlowRouter.go('Landing')
      }
    })
  }

  render(){
    const background_url = "url(" + this.state.config.landing_header_background_url + ")"
    console.log("background", background_url);

    return(
      <Grid className="init-config-container" centered stackable style={{backgroundImage: this.state.step == 2 ? background_url : ''}}>
        <Container>
          <Grid.Column width={16}>
            <Grid verticalAlign="middle" className="init-config-container">
              {this.state.step == 0 ?
                <Grid.Column width={16} className="center-align">
                  <Header className="wow fadeInUp"  as="h1">Premièrement, quel est le nom de votre ville ?</Header>
                  <Form onSubmit={(e) => {this.stepChange(1, e)}}>
                    <Input fluid type="text" className="wow fadeInUp" focus={true} placeholder="ex: Paris" data-wow-delay="1s" size="huge" onChange={(e) => {this.handleConfigChange('main_title', e)}}/>
                  </Form>
                </Grid.Column>
                : ''}
                {this.state.step == 1 ?
                  <Grid.Column width={16} className="center-align">
                    <Header className="wow fadeInUp"  as="h1">Parfait. Quelle phrase d'accroche souhaitez-vous afficher sur la page d'accueil ?</Header>
                    <Form onSubmit={(e) => {this.stepChange(2, e)}}>
                      <Input type="text" fluid className="wow fadeInUp" focus={true} placeholder="ex: Participez à tous les projets de la ville" data-wow-delay="1s" size="huge" onChange={(e) => {this.handleConfigChange('landing_header_description', e)}}/>
                    </Form>
                  </Grid.Column>
                  : ''}
                {this.state.step == 2 ?
                  <Grid.Column width={16} className="center-align">
                    <Header className="wow fadeInUp" as="h1">Ajoutons un peu de couleurs à votre espace ! </Header>
                    <Header className="wow fadeInUp" data-wow-delay="1s" as="h3">Entrez l'URL d'une image que vous souhaitez en fond de votre page d'accueil</Header>
                    <p className="wow fadeInUp" data-wow-delay="2s">(Attention, les images doivent être libres de droit, ou vous appartenir)</p>

                    <Form onSubmit={(e) => {this.submit_configuration(e)}} >
                      <Input type="text" fluid className="wow fadeInUp" focus={true} placeholder="ex: http://" data-wow-delay="3s" size="huge" onChange={(e) => {this.handleConfigChange('landing_header_background_url', e)}}/>
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
