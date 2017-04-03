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
      <Grid>
        <Grid.Row centered columns={1}>
          <Grid.Column width={12} color="green">
            <Header as="h1">Landing page</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
