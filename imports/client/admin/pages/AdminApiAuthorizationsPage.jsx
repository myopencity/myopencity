import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Loader, Container, Table, Button} from 'semantic-ui-react'
import {ApiAuthorizations} from '/imports/api/api_authorizations/api_authorizations'
import AdminApiAuthorizationPartial from '/imports/client/api_authorizations/ui/AdminApiAuthorizationPartial'
import AdminApiAuthorizationForm from '/imports/client/api_authorizations/ui/AdminApiAuthorizationForm'

export class AdminApiAuthorizationsPage extends Component{

  /*
    required props:
      - none
  */

  constructor(props){
    super(props);
    this.state = {
      editing_authorization: null,
      display_form: false
    }
  }

  onFormSubmitted(auth){
    this.setState({editing_authorization: null, display_form: false})
  }

  toggleState(attr, e){
    let state = this.state
    state[attr] = !state[attr]
    if(state.display_form == false){
      state.editing_authorization = null
    }
    this.setState(state)
  }

  editAuthorization(auth){
    this.setState({editing_authorization: auth, display_form: true})
  }

  render(){
    const {api_authorizations, loading} = this.props
    const {display_form, editing_authorization} = this.state

    if(!loading){
      return(
        <Grid stackable>
          <Grid.Column width={16} className="center-align">
            <Header as="h3">Gestion des autorisations d'API</Header>
            <Button onClick={(e) => {this.toggleState('display_form', e)}} positive={!display_form}>{display_form ? "Annuler" : "Ajouter une autorisation"}</Button>
          </Grid.Column>
          <Container>
            {display_form ?
              <AdminApiAuthorizationForm authorization={editing_authorization} onFormSubmitted={this.onFormSubmitted.bind(this)} />
            :
              <Grid.Column width={16}>
                <Table celled striped>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Nom</Table.HeaderCell>
                      <Table.HeaderCell>Clé</Table.HeaderCell>
                      <Table.HeaderCell>URL</Table.HeaderCell>
                      <Table.HeaderCell>Récup. consultations</Table.HeaderCell>
                      <Table.HeaderCell>Poster votes</Table.HeaderCell>
                      <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {api_authorizations.map((auth, index) => {
                      return (
                        <AdminApiAuthorizationPartial api_authorization={auth} onUpdateClick={(e) => {this.editAuthorization(auth, e)}} />
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

export default AdminApiAuthorizationsPageContainer = createContainer(({}) => {
  const ApiAuthorizationsPublication = Meteor.subscribe('api_authorizations.all')
  const loading = !ApiAuthorizationsPublication.ready()
  const api_authorizations = ApiAuthorizations.find({}).fetch()
  return {
    loading,
    api_authorizations
  }
}, AdminApiAuthorizationsPage)
