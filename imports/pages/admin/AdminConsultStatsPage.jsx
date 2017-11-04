import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Loader} from 'semantic-ui-react'
import {Consults} from '/imports/api/consults/consults'
import {ConsultParts} from '/imports/api/consult_parts/consult_parts'
import ConsultPartAdminStats from '/imports/components/consult_parts/ConsultPartAdminStats'

export class AdminConsultStatsPage extends TrackerReact(Component){

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
    const {consult, consult_parts, loading} = this.props

    if(!loading){
      return(
        <Grid stackable>
          <Grid.Column width={16} className="center-align">
            <Header as="h1">Statistiques pour la consultation "{consult.title}"</Header>
            {consult_parts.map((consult_part, index) => {
              return (
                <ConsultPartAdminStats consult_part={consult_part} />
              )
            })}
          </Grid.Column>
        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement des statistiques de la consultation</Loader>
    }
  }
}

export default AdminConsultStatsPageContainer = createContainer(({ shorten_url }) => {
  const consultsPublication = Meteor.subscribe('consult.admin_by_shorten_url', shorten_url)
  const consult = Consults.findOne({url_shorten: shorten_url})
  const consultPartsPublication = Meteor.subscribe('consult_parts.by_consult_url_shorten', shorten_url)
  const consult_parts = ConsultParts.find({consult_url_shorten: shorten_url}).fetch()
  const loading = !consultsPublication.ready() || !consultPartsPublication.ready()
  return {
    loading,
    consult,
    consult_parts
  }
}, AdminConsultStatsPage)
