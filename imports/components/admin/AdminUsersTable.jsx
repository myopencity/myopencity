import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Loader, Table} from 'semantic-ui-react'
import AdminUserRow from '/imports/components/admin/AdminUserRow'

export class AdminUsersTable extends TrackerReact(Component){

  /*
    required props:
      - page: Number
    facultative props:
      - nb_results: Number
      - filter_text: String

  */

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    const {users, loading} = this.props

    if(!loading){
      return(
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nom d'utilisateur</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Créé le</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map(function(user, index){
              return(
                <AdminUserRow user={user} key={index}/>
              )
            })}
          </Table.Body>
        </Table>
      )
    }else{
      return <Loader className="inline-block">Chargement des utilisateurs</Loader>
    }
  }
}

export default AdminUsersTableContainer = createContainer(({ page, filter_text, nb_results }) => {
  const usersPublication = Meteor.subscribe('users.search', {page, filter_text, nb_results})
  const loading = !usersPublication.ready()
  const users = Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch()
  return {
    loading,
    users
  }
}, AdminUsersTable)
