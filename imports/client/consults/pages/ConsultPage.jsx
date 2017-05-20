import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header} from 'semantic-ui-react'

export default class ConsultPage extends TrackerReact(Component){

  /*
    required props:
      - consult
  */

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    const consult = this.props.consult

    if(consult){
      return(
        <Grid>
          <Grid.Column width={16} className="center-align">
            {consult.title}
          </Grid.Column>
        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement de la consultation</Loader>
    }
  }
}

export default ConsultPageContainer = createContainer(({ urlShorten }) => {
  const consultPublication = Meteor.subscribe('consult', urlShorten)
  const loading = !consultPublication.ready()
  const consult = Consult.findOne({_id: id, visible: true})
  return {
    loading,
    consult
  }
}, ConsultPage)
