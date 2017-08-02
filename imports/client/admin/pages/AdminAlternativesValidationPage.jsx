import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Loader} from 'semantic-ui-react'
import {Alternatives} from '/imports/api/alternatives/alternatives'
import AlternativePartial from '/imports/client/alternatives/ui/AlternativePartial'

export class AdminAlternativesValidationPage extends TrackerReact(Component){

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
    const {alternatives, loading} = this.props

    if(!loading){
      return(
        <Grid stackable>
          <Grid.Column width={16} className="center-align">
            <Header as="h2">Validation des alternatives</Header>
          </Grid.Column>
          <Grid.Column width={16}>
            {alternatives.map((alternative, index) => {
              return (
               <AlternativePartial alternative={alternative} />
              )
            })}
          </Grid.Column>
        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement des alternatives</Loader>
    }
  }
}

export default AdminAlternativesValidationPageContainer = createContainer(({}) => {
  const alternativesPublication = Meteor.subscribe('alternatives.unvalidated')
  const loading = !alternativesPublication.ready()
  const alternatives = Alternatives.find({validated: false}).fetch()
  return {
    loading,
    alternatives
  }
}, AdminAlternativesValidationPage)
