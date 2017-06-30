import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Loader} from 'semantic-ui-react'
import {ConsultPartVotes} from '/imports/api/consult_part_votes/consult_part_votes'


export class ConsultPartAdminStats extends TrackerReact(Component){

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
    const {consult_part, consult_part_votes, loading} = this.props

    if(!loading){
      return(
        <Grid stackable className="consult-part-admin-stats">
          <Grid.Column width={16} className="left-align">
            <Header as="h3">{consult_part.title}</Header>
          </Grid.Column>
        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement des statistiques de la partie</Loader>
    }
  }
}

export default ConsultPartAdminStatsContainer = createContainer(({ consult_part }) => {
  const consultPartVotesPublication = Meteor.subscribe('consult_part_votes.by_part', consult_part._id)
  const loading = !consultPartVotesPublication.ready()
  const consult_part_votes = ConsultPartVotes.find({}).fetch()
  return {
    loading,
    consult_part_votes
  }
}, ConsultPartAdminStats)
