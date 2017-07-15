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
      removing: false
    }
  }

  onUpdateClick(e){
    e.preventDefault()
    this.props.onUpdateClick(this.props.api_authorization)
  }

  toggleState(attr, e){
    let state = this.state
    state[attr] = !state[attr]
    this.setState(state)
  }

  remove(e){
    e.preventDefault()
    Meteor.call('api_authorizations.remove', this.props.api_authorization._id , (error, result) => {
      if(error){
        console.log(error)
        Bert.alert({
          title: "Erreur lors de la suppression de l'autorisation",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        Bert.alert({
          title: "Autorisation supprimée",
          type: 'success',
          style: 'growl-bottom-left',
        })
      }
    });
  }

  render(){
    const {api_authorization} = this.props
    const {removing} = this.state
    
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
          {removing ?
            <p>
              Êtes-vous sur ?<br/>
            <Button onClick={(e) => {this.toggleState('removing', e)}}>Annuler</Button>
              <Button color="red" onClick={(e) => {this.remove(e)}}>Supprimer</Button>
            </p>
          :
            <Button color="red" onClick={(e) => {this.toggleState('removing', e)}}>Supprimer</Button>
          }
        </Table.Cell>
      </Table.Row>
    )
  }
}
