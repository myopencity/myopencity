import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Loader, Container, Table, Button} from 'semantic-ui-react'
import {ExternalOpencities} from '/imports/api/external_opencities/external_opencities'
import AdminExternalOpencityPartial from '/imports/client/external_opencities/ui/AdminExternalOpencityPartial'
import AdminExternalOpencityForm from '/imports/client/external_opencities/ui/AdminExternalOpencityForm'

export class AdminExternalOpencitiesPage extends Component{

  /*
    required props:
      - none
  */

  constructor(props){
    super(props);
    this.state = {
      editing_external_opencity: null,
      display_form: false
    }
  }

  onFormSubmitted(auth){
    this.setState({editing_external_opencity: null, display_form: false})
  }

  toggleState(attr, e){
    let state = this.state
    state[attr] = !state[attr]
    if(state.display_form == false){
      state.editing_external_opencity = null
    }
    this.setState(state)
  }

  editExternalOpencity(extern_opencity){
    this.setState({editing_external_opencity: extern_opencity, display_form: true})
  }

  getExternalConsults(e){
    e.preventDefault()
    Meteor.call('api_call.get_external_consults', (error, result) => {
      if(error){
        console.log(error)
        Bert.alert({
          title: "Erreur lors de la récupération des consultations externes",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        Bert.alert({
          title: "Consultations externes récupérées",
          message: "Pensez à les rendre visibles dans la partie d'administration des consultations",
          type: 'success',
          style: 'growl-bottom-left',
        })
      }
    });
  }

  render(){
    const {external_opencities, loading} = this.props
    const {display_form, editing_external_opencity} = this.state

    if(!loading){
      return(
        <Grid stackable>
          <Grid.Column width={16} className="center-align">
            <Header as="h3">Gestion des autorisations d'API</Header>
            <Button onClick={(e) => {this.toggleState('display_form', e)}} positive={!display_form}>{display_form ? "Annuler" : "Ajouter une autorisation"}</Button>
            <Button onClick={(e) => {this.getExternalConsults(e)}}>Récupérer les consultations externes</Button>
          </Grid.Column>
          <Container>
            {display_form ?
              <AdminExternalOpencityForm external_opencity={editing_external_opencity} onFormSubmitted={this.onFormSubmitted.bind(this)} />
            :
              <Grid.Column width={16}>
                <Table stackable celled striped>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Nom</Table.HeaderCell>
                      <Table.HeaderCell>Clé</Table.HeaderCell>
                      <Table.HeaderCell>URL</Table.HeaderCell>
                      <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {external_opencities.map((extern_opencity, index) => {
                      return (
                        <AdminExternalOpencityPartial external_opencity={extern_opencity} onUpdateClick={(e) => {this.editExternalOpencity(extern_opencity, e)}} />
                      )
                    })}
                  </Table.Body>
                </Table>
              </Grid.Column>
            }
          </Container>
        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement des autorisations</Loader>
    }
  }
}

export default AdminExternalOpencitiesPageContainer = createContainer(({}) => {
  const ExternalOpencitiesPublication = Meteor.subscribe('external_opencities.all')
  const loading = !ExternalOpencitiesPublication.ready()
  const external_opencities = ExternalOpencities.find({}).fetch()
  return {
    loading,
    external_opencities
  }
}, AdminExternalOpencitiesPage)
