import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Header, Container, Loader, Image, Button} from 'semantic-ui-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Consults} from '/imports/api/consults/consults'
import {Projects} from '/imports/api/projects/projects'

export class LandingPage extends TrackerReact(Component){

  constructor(props){
    super(props)
    this.state = {

    }
  }

  go(route, params, e){
    e.preventDefault()
    FlowRouter.go(route, params)
  }

  render(){
    const {
      landing_header_background_url,
      main_title,
      landing_main_title_color,
      landing_header_description_color,
      landing_main_title,
      landing_header_description,
      landing_consults_background_color,
      landing_explain_text
    } = Session.get('global_configuration')

    const {consults, projects, loading} = this.props

    if(!loading){
      return(
        <Grid stackable centered className="landing-page">
          <Grid.Column width={16}>
            <Grid className="landing-header" style={{backgroundImage: "url(" + landing_header_background_url + ")"}} verticalAlign="middle">
              <Grid.Column width={16}>
                <Header className="wow fadeInUp main-title" style={{color: landing_main_title_color}} as="h1">{landing_main_title ? landing_main_title : main_title }</Header>
                <Header className="wow fadeInUp" style={{color: landing_header_description_color}} data-wow-delay="1s" as="h2">{landing_header_description}</Header>
              </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column width={16} className="center-align landing-part" verticalAlign="middle">
            <Grid verticalAlign="middle" stackable>
              <Grid.Column width={16} className="center-align landing-title-container">
                <div className="landing-back-title">{main_title}</div>
                <Header as="h2">Qu'est-ce que c'est ?</Header>
              </Grid.Column>
              <Grid.Column width={16}>
                <Container>
                  <div dangerouslySetInnerHTML={{__html: landing_explain_text }}></div>
                </Container>
              </Grid.Column>
            </Grid>
          </Grid.Column>
          {consults.length > 0 ?
              <Grid.Column width={16} className="center-align landing-title-container">
                <div className="landing-back-title">CONSULTATIONS</div>
                <Header as="h2">Les consultations du moment</Header>
              </Grid.Column>
          : ''}
          {consults.length > 0 ?
              <Grid.Column width={16} className="landing-consults-part" style={{backgroundColor: landing_consults_background_color}}>
                {consults.map((consult, index) => {
                  return (
                    <Grid verticalAlign="middle background-img" style={{minHeight: "20em", backgroundImage: "url(" + consult.image_url + ")"}} stackable>
                      <Grid.Column width={16} className="center-align landing-consult-container" >
                        <Container className="landing-consult-text">
                          <Header as="h2" style={{color: "white"}}>{consult.title}</Header>
                          <p>{consult.description}</p>
                          <Button onClick={(e) => {this.go('Consult', {urlShorten: consult.url_shorten}, e)}}>Voir la consultation</Button>
                        </Container>
                      </Grid.Column>
                    </Grid>
                  )
                })}
              </Grid.Column>
            : ''}
            {projects.length > 0 ?
                <Grid.Column width={16} className="center-align landing-title-container">
                  <div className="landing-back-title">PROPOSITIONS</div>
                  <Header as="h2">Les projets proposés du moment</Header>
                </Grid.Column>
            : ''}
            {projects.length > 0 ?
                <Grid.Column width={16} className="landing-consults-part" style={{backgroundColor: landing_consults_background_color}}>
                  {projects.map((project, index) => {
                    return (
                      <Grid verticalAlign="middle background-img" style={{minHeight: "20em", backgroundImage: "url(" + project.image_url + ")"}} stackable>
                        <Grid.Column width={16} className="center-align landing-consult-container" >
                          <Container className="landing-consult-text">
                            <Header as="h2" style={{color: "white"}}>{project.title}</Header>
                            <p>{project.description}</p>
                            <Button onClick={(e) => {this.go('Project', {shorten_url: project.shorten_url}, e)}}>Voir la proposition</Button>
                          </Container>
                        </Grid.Column>
                      </Grid>
                    )
                  })}
                </Grid.Column>
              : ''}
          </Grid>
        )
    }else{
      return <Loader className="inline-block">Chargement de la page</Loader>
    }
  }
}

export default LandingPageContainer = createContainer(() => {
  const landingConsultsPublication = Meteor.subscribe('consults.landing')
  const landingProjectsPublication = Meteor.subscribe('projects.landing')
  const loading = !landingConsultsPublication.ready() || !landingProjectsPublication.ready()
  const consults = Consults.find({landing_display: true}).fetch()
  const projects = Projects.find({landing_display: true}).fetch()
  return {
    loading,
    consults,
    projects
  }
}, LandingPage)
