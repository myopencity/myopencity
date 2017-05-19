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
    return(
      <Grid stackable centered>
        <Grid.Column width={16} color="green">
          <Header as="h1">Landing page</Header>
        </Grid.Column>
      </Grid>
    )
  }
}
