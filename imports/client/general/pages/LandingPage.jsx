import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Grid, Header, Container} from 'semantic-ui-react';

export default class LandingPage extends TrackerReact(Component){

  constructor(props){
    super(props);
    this.state = {

    }
  }


  render(){
    const {
      landing_header_background_url,
      main_title,
      landing_main_title_color,
      landing_header_description_color,
      landing_main_title,
      landing_header_description
    } = Session.get('global_configuration')


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
            <Grid.Column width={16}>
              <Header as="h2">Qu'est-ce que c'est ?</Header>
              <Header as="h3">{main_title} est une plateforme de démocratie en ligne</Header>
              <Container>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nemo porro impedit adipisci maxime, minus commodi beatae, cum atque delectus similique, totam! Illo perferendis, voluptate quo culpa, tenetur, facere soluta neque cum voluptatibus consequatur suscipit harum quos sit officiis quae. Explicabo sequi accusamus, eaque praesentium asperiores quibusdam fugit optio ullam, eos. Blanditiis illo eius optio veniam pariatur laboriosam consequatur, tempore porro iure! Vel eligendi totam eum laboriosam neque harum molestias. Ea maxime voluptatem, possimus similique quibusdam, sit nemo culpa mollitia nulla quam unde atque pariatur? Nostrum autem quasi, consequuntur, possimus suscipit nihil blanditiis vitae quia dolore cum sunt iusto perspiciatis doloribus labore, illum neque totam tenetur voluptates voluptas maxime? Repudiandae consequuntur qui dolore laboriosam, voluptatem ex labore assumenda, tempora libero cumque tenetur, animi debitis corrupti ut quis saepe magni sunt illo nam odio aliquid quo explicabo deserunt. Error beatae debitis distinctio, itaque sint corporis aperiam enim est veniam, maxime quam, unde, dolores saepe sunt? Temporibus vitae placeat officiis neque excepturi quibusdam nihil accusamus doloremque provident at, libero vero id eligendi nemo, ipsam minus recusandae quod earum porro. Cum quos molestiae, dolorum aliquid, rerum magnam, expedita maxime quia aliquam nam sed corporis fuga omnis minus quis dolore rem. Et, tempore est.</p>
              </Container>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    )
  }
}
