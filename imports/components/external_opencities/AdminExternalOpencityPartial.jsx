import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Table, Button} from 'semantic-ui-react'

export default class AdminExternalOpencityPartial extends TrackerReact(Component){

  /*
    required props:
      - external_opencity: Object

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
    this.props.onUpdateClick(this.props.external_opencity)
  }

  toggleState(attr, e){
    let state = this.state
    state[attr] = !state[attr]
    this.setState(state)
  }

  remove(e){
    e.preventDefault()
    Meteor.call('external_opencities.remove', this.props.external_opencity._id , (error, result) => {
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
    const {external_opencity} = this.props
    const {removing} = this.state

    return(
      <Table.Row>
        <Table.Cell>
          {external_opencity.name}
        </Table.Cell>
        <Table.Cell>
          {external_opencity.private_key}
        </Table.Cell>
        <Table.Cell>
          {external_opencity.url}
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
