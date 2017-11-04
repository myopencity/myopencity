import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Loader} from 'semantic-ui-react'

export default class NotFound extends TrackerReact(Component){

  /*
    required props:
      - none
  */

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    const {not_found_message} = Meteor.isClient &&  Session.get('global_configuration')

      return(
        <Grid stackable>
          <Grid.Column width={16}>
            <Header as="h3">{not_found_message ? not_found_message : "Page non trouvée"}</Header>
          </Grid.Column>
        </Grid>
      )
  }
}
