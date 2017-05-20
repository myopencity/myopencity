import {Meteor} from 'meteor/meteor'
import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Menu, Modal, Dropdown} from 'semantic-ui-react'
import SigninForm from '/imports/client/accounts/ui/SigninForm'

export default class NavbarAccountItem extends TrackerReact(Component){

  /*
    required props:
      - none
  */

  constructor(props){
    super(props);
    this.state = {
      screen_size: window.innerWith
    }
  }

  onSignin(user_id){
    FlowRouter.go('Landing')
  }

  logout(){
    Meteor.logout((error, result) => {
      if(error){
        Bert.alert({
          title: "Erreur lors de la déconnexion",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        Bert.alert({
          title: "Au revoir",
          message: "Vous avez été déconnecté",
          type: 'success',
          style: 'growl-bottom-left',
        })
      }
    })
  }

  go(route, e){
    e.preventDefault()
    FlowRouter.go(route)
  }

  toggleState(attr, e){
    e.preventDefault()
    let state = this.state
    state[attr] = !state[attr]
    this.setState(state)
  }

  render(){
    const current_user = Meteor.user()

    if(current_user){
      return(
        <Dropdown item text={current_user.username}>
          <Dropdown.Menu>
            <Dropdown.Item>Profil</Dropdown.Item>
            {Roles.userIsInRole(Meteor.userId(), ['admin', 'moderator'])}
            <Dropdown.Item onClick={(e) => {this.go('AdminConsults', e)}}>Admin</Dropdown.Item>
            <Dropdown.Item onClick={this.logout.bind(this)}>Déconnexion</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        )
    }else{
      return (
        <div>
          <Menu.Item className="navbar-item" onClick={(e) => {this.toggleState('open_modal', e)}} name="Connexion"/>
          <Modal className="wow fadeInUp" open={this.state.open_modal} onClose={(e) => {this.toggleState('open_modal', e)}}>
            <Modal.Header>Connexion</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <SigninForm onSignin={this.onSignin.bind(this)} />
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </div>
      )
    }
  }
}
