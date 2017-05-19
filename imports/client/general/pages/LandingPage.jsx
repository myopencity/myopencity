import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Grid, Header} from 'semantic-ui-react';

export default class LandingPage extends TrackerReact(Component){

  constructor(props){
    super(props);
    this.state = {

    }
  }


  render(){
    const header_background = Session.get('global_configuration').landing_header_background_url

    return(
      <Grid stackable centered>
        <Grid.Column width={16}>
          <Grid className="landing-header" style={{backgroundImage: "url(" + header_background + ")"}} verticalAlign="middle">
            <Grid.Column width={16}>
              <Header className="white wow fadeInUp main-title" as="h1">{Session.get('global_configuration').main_title}</Header>
              <Header className="white wow fadeInUp" data-wow-delay="1s" as="h2">{Session.get('global_configuration').landing_header_description}</Header>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    )
  }
}
