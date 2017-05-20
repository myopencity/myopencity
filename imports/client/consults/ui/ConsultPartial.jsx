import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Card, Image, Button} from 'semantic-ui-react'
import _ from 'lodash'

export default class ConsultPartial extends TrackerReact(Component){

  /*
    required props:
      - consult
  */

  constructor(props){
    super(props)
    this.state = {
      display_manage_buttons: false
    }
  }

  toggleState(attr, e){
    let state = this.state
    state[attr] = !state[attr]
    this.setState(state)
  }

  toggleEditConsult(attr, e){
    let consult = this.props.consult
    consult[attr] = !consult[attr]
    Meteor.call('consults.update', consult, (error, result) => {
      if(error){
        console.log(error)
        Bert.alert({
          title: "Erreur lors de la modification de la consultation",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        Bert.alert({
          title: "Consultation modifiée",
          type: 'success',
          style: 'growl-bottom-left',
        })
      }
    });
  }

  render(){
    const consult = this.props.consult

    if(consult){
      return(
        <Card className="inline-block">
          <Image src={consult.image_url} />
          <Card.Content>
            <Card.Header>
              {consult.title}
            </Card.Header>
            <Card.Description>
              {this.state.display_manage_buttons ?
                <div>
                  <p>{consult.visible ? "Consultation actuellement visible" : "Consultation actuellement cachée"}</p>
                  <p>{consult.votable ? "Votes en cours" : "Votes désactivés"}</p>
                </div>
              :
                <div>{_.truncate(consult.description, {length: 200, separator: ' '})}</div>
              }
            </Card.Description>
          </Card.Content>
          {Roles.userIsInRole(Meteor.userId(), ['admin', 'moderator'])}
          <Card.Content className="center-align" extra>
            <Button fluid positive={this.state.display_manage_buttons} onClick={(e) => {this.toggleState('display_manage_buttons', e)}}>Gérer</Button>
            {this.state.display_manage_buttons ?
              <div>
                <Button onClick={(e) => {this.toggleEditConsult('visible', e)}} fluid>{consult.visible ? "Rendre invisible" : "Rendre visible"}</Button>
                <Button onClick={(e) => {this.toggleEditConsult('votable', e)}} fluid>{consult.votable ? "Stopper les votes" : "Lancer les votes"}</Button>
              </div>
            : ''}
          </Card.Content>
        </Card>
      )
    }else{
      return <div></div>
    }
  }
}
