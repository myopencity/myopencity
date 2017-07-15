import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Card, Image, Button, Icon} from 'semantic-ui-react'
import _ from 'lodash'

export default class ConsultPartial extends TrackerReact(Component){

  /*
    required props:
      - consult: Object
    facultative props:
      - hideButtons: Boolean (hide the partial buttons)
  */

  constructor(props){
    super(props)
    this.state = {
      display_manage_buttons: false,
      remove_confirm: false
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
    Meteor.call('consults.update', {consult}, (error, result) => {
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

  go(route, params, e){
    e.preventDefault()
    FlowRouter.go(route, params)
  }

  removeConsult(e){
    Meteor.call('consults.remove', this.props.consult._id, (error, result) => {
      if(error){
        console.log(error)
        Bert.alert({
          title: "Erreur lors de la suppression de la consultation",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        Bert.alert({
          title: "La consultation a été supprimée",
          type: 'success',
          style: 'growl-bottom-left',
        })
      }
    });
  }

  render(){
    const {consult, className} = this.props

    if(consult){
      return(
        <Card className={"inline-block " + className}>
          <Image src={consult.image_url} />
          <Card.Content>
            <Card.Header>
              {consult.title}
              {consult.external_url ?
                <span className="external-label"><br/><Icon name="sitemap"/> {consult.external_site_name}</span>
              : ''}
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
          {!this.props.hideButtons ?
            <Card.Content className="center-align" extra>
              <Button onClick={(e) => {this.go('Consult', {urlShorten: consult.url_shorten}, e)}} fluid>Consulter</Button>
              {Roles.userIsInRole(Meteor.userId(), ['admin', 'moderator']) ?
                <div>
                  <Button fluid active={this.state.display_manage_buttons} onClick={(e) => {this.toggleState('display_manage_buttons', e)}}>Gérer</Button>
                  {this.state.display_manage_buttons ?
                    <div>
                      <Button onClick={(e) => {this.go('AdminConsultEdit', {consult_shorten_url: consult.url_shorten}, e)}} fluid>Modifier</Button>
                      <Button onClick={(e) => {this.toggleEditConsult('visible', e)}} fluid>{consult.visible ? "Rendre invisible" : "Rendre visible"}</Button>
                      <Button onClick={(e) => {this.toggleEditConsult('votable', e)}} fluid>{consult.votable ? "Stopper les votes" : "Lancer les votes"}</Button>
                      <Button onClick={(e) => {this.toggleEditConsult('ended', e)}} fluid>{consult.ended ? "Lancer la consultation" : "Stopper la consultation"}</Button>
                      <Button onClick={(e) => {this.go('AdminConsultStats', {shorten_url: consult.url_shorten}, e)}} fluid>Statistiques</Button>
                      <Button onClick={(e) => {this.toggleEditConsult('landing_display', e)}} fluid>{consult.landing_display ? "Ne plus mettre en avant" : "Mettre en avant"}</Button>
                      {this.state.remove_confirm ?
                        <div className="wow fadeInUp">
                          <p>Vous confirmez ?</p>
                          <Button onClick={(e) => {this.toggleState('remove_confirm', e)}}>Annuler</Button>
                          <Button color="red" onClick={(e) => {this.removeConsult(e)}}>Supprimer</Button>
                        </div>
                      :
                        <Button color="red" onClick={(e) => {this.toggleState('remove_confirm', e)}} fluid>Supprimer</Button>
                      }
                    </div>
                    : ''}
                  </div>
                  : ''}
                </Card.Content>
          : ''}
        </Card>
      )
    }else{
      return <div></div>
    }
  }
}
