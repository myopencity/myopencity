import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Header, Container, Loader, Image, Button} from 'semantic-ui-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Consults} from '/imports/api/consults/consults'

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
      landing_consults_background_color
    } = Session.get('global_configuration')

    const {consults, loading} = this.props

    if(!loading){
      return(
        <Grid stackable centered>
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
                <Header as="h3">{main_title} est une plateforme de démocratie en ligne</Header>
                <Container>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nemo porro impedit adipisci maxime, minus commodi beatae, cum atque delectus similique, totam! Illo perferendis, voluptate quo culpa, tenetur, facere soluta neque cum voluptatibus consequatur suscipit harum quos sit officiis quae. Explicabo sequi accusamus, eaque praesentium asperiores quibusdam fugit optio ullam, eos. Blanditiis illo eius optio veniam pariatur laboriosam consequatur, tempore porro iure! Vel eligendi totam eum laboriosam neque harum molestias. Ea maxime voluptatem, possimus similique quibusdam, sit nemo culpa mollitia nulla quam unde atque pariatur? Nostrum autem quasi, consequuntur, possimus suscipit nihil blanditiis vitae quia dolore cum sunt iusto perspiciatis doloribus labore, illum neque totam tenetur voluptates voluptas maxime? Repudiandae consequuntur qui dolore laboriosam, voluptatem ex labore assumenda, tempora libero cumque tenetur, animi debitis corrupti ut quis saepe magni sunt illo nam odio aliquid quo explicabo deserunt. Error beatae debitis distinctio, itaque sint corporis aperiam enim est veniam, maxime quam, unde, dolores saepe sunt? Temporibus vitae placeat officiis neque excepturi quibusdam nihil accusamus doloremque provident at, libero vero id eligendi nemo, ipsam minus recusandae quod earum porro. Cum quos molestiae, dolorum aliquid, rerum magnam, expedita maxime quia aliquam nam sed corporis fuga omnis minus quis dolore rem. Et, tempore est.</p>
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
          </Grid>
        )
    }else{
      return <Loader className="inline-block">Chargement de la page</Loader>
    }
  }
}

export default LandingPageContainer = createContainer(() => {
  const landingConsultsPublication = Meteor.subscribe('consults.landing')
  const loading = !landingConsultsPublication.ready()
  const consults = Consults.find({}).fetch()
  return {
    loading,
    consults
  }
}, LandingPage)
