import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Loader} from 'semantic-ui-react'
import {Configuration} from '/imports/api/configuration/configuration'


export class NotFound extends TrackerReact(Component){

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
    const {loading, global_configuration} = this.props
    const {not_found_message} = global_configuration

    if(!loading){
      return(
        <Grid stackable>
          <Grid.Column width={16}>
            <Header as="h3">{not_found_message ? not_found_message : "Page non trouvée"}</Header>
          </Grid.Column>
        </Grid>
      )
    }else{
      return <div></div>
    }

  }
}

export default NotFoundContainer = createContainer(() => {
  const globalConfigurationPublication = Meteor.isClient && Meteor.subscribe('global_configuration')
  const loading = Meteor.isClient && !globalConfigurationPublication.ready()
  const global_configuration = Configuration.findOne({})
  return {
    loading,
    global_configuration
  }
}, NotFound)
