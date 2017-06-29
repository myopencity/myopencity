import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Loader} from 'semantic-ui-react'
import ConsultPartial from '/imports/client/consults/ui/ConsultPartial'
import {Consults} from '/imports/api/consults/consults'

export class ConsultsPage extends TrackerReact(Component){

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
    const consults = this.props.consults
    if(!this.props.loading){
      return(
        <Grid className="wow fadeInUp" stackable>
          <Grid.Column width={16} className="center-align">
            <Header as="h1">Consultations en cours</Header>
          </Grid.Column>
          <Grid.Column width={16}>
            {consults.length == 0 ?
              <Header className="center-align" as="h3">Aucune consultation en cours actuellement</Header>
            :
              <Grid stackable>
                {consults.map((consult, index) => {
                  return (
                    <Grid.Column width={4} className="center-align">
                      <ConsultPartial consult={consult} />
                    </Grid.Column>
                  )
                })}
              </Grid>
            }
          </Grid.Column>
        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement des consultations</Loader>
    }
  }
}

export default ConsultsPageContainer = createContainer(({ id }) => {
  const consultsPublication = Meteor.subscribe('consults.visible')
  const loading = !consultsPublication.ready()
  const consults = Consults.find({visible: true}).fetch()
  return {
    loading,
    consults
  }
}, ConsultsPage)
