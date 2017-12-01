import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Header, Button, Loader, Container} from 'semantic-ui-react'
import ConsultPartial from '/imports/components/consults/ConsultPartial'
import {Consults} from '/imports/api/consults/consults'
import { createContainer } from 'meteor/react-meteor-data'
import {Link} from 'react-router-dom'

export class AdminConsultsPage extends TrackerReact(Component){

  /*
    required props:
      - none
  */

  constructor(props){
    super(props)
    this.state = {

    }
    console.log(this.props.consults)

  }


  render(){
    const {consults, loading} = this.props
    if(!loading){
      return(
        <Grid stackable className="wow fadeInLeft">
          <Grid.Column width={16} className="center-align">
            <Header as="h1">Gestion des consultations</Header>
          </Grid.Column>
          <Grid.Column width={16}>
            <Container>
              <Link to="/admin/consults/new">
                <Button positive>Créer une nouvelle consultation</Button>
              </Link>
              <Grid stackable>
                {consults.map((consult, index) => {
                  return (
                    <Grid.Column key={index} width={4} className="center-align">
                      <ConsultPartial consult={consult} />
                    </Grid.Column>
                  )
                })}
              </Grid>
            </Container>
          </Grid.Column>
        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement des consultations</Loader>
    }
  }
}

export default AdminConsultsPageContainer = createContainer(() => {
  const consultsPublication = Meteor.isClient && Meteor.subscribe('consults.all')
  const loading = Meteor.isClient && !consultsPublication.ready()
  const consults = Consults.find({}).fetch()
  return {
    loading,
    consults
  }
}, AdminConsultsPage)
