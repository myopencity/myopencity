import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Loader} from 'semantic-ui-react'
import {Consults} from '/imports/api/consults/consults'

export class ConsultPage extends TrackerReact(Component){

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
        <Grid stackable className="wow fadeInUp">
          <Grid.Column width={16} className="center-align">
            <Header as="h1">{consult.title}</Header>
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
  const consult = Consults.findOne({url_shorten: urlShorten, visible: true})
  return {
    loading,
    consult
  }
}, ConsultPage)
