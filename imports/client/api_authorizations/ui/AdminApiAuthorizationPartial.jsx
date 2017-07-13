import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Table, Button} from 'semantic-ui-react'

export default class AdminApiAuthorizationPartial extends TrackerReact(Component){

  /*
    required props:
      - api_authorization: Object

    facultative props:
      - onUpdateClick: Function
  */

  constructor(props){
    super(props);
    this.state = {

    }
  }

  onUpdateClick(e){
    e.preventDefault()
    this.props.onUpdateClick(this.props.api_authorization)
  }

  render(){
    const {api_authorization} = this.props
    return(
      <Table.Row>
        <Table.Cell>
          {api_authorization.name}
        </Table.Cell>
        <Table.Cell>
          {api_authorization.private_key}
        </Table.Cell>
        <Table.Cell>
          {api_authorization.url}
        </Table.Cell>
        <Table.Cell>
          {api_authorization.can_get_consults ? "OUI" : "NON"}
        </Table.Cell>
        <Table.Cell>
          {api_authorization.can_post_votes ? "OUI" : "NON"}
        </Table.Cell>
        <Table.Cell>
          <Button onClick={(e) => {this.onUpdateClick(e)}}>Modifier</Button>
          <Button color="red">Supprimer</Button>
        </Table.Cell>
      </Table.Row>
    )
  }
}
