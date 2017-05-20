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
    const conf = Session.get('global_configuration')
    const header_background = conf.landing_header_background_url

    return(
      <Grid stackable centered>
        <Grid.Column width={16}>
          <Grid className="landing-header" style={{backgroundImage: "url(" + header_background + ")"}} verticalAlign="middle">
            <Grid.Column width={16}>
              <Header className="wow fadeInUp main-title" style={{color: conf.landing_main_title_color}} as="h1">{conf.landing_main_title ? conf.landing_main_title : conf.main_title }</Header>
              <Header className="wow fadeInUp" style={{color: conf.landing_header_description_color}} data-wow-delay="1s" as="h2">{conf.landing_header_description}</Header>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    )
  }
}
