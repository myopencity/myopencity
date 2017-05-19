import {Meteor} from 'meteor/meteor'
import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Menu, Modal} from 'semantic-ui-react'
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
        <Menu.Item className="navbar-item">{current_user.username}</Menu.Item>
        )
    }else{
      return (
        <div>
          <Menu.Item className="navbar-item" onClick={(e) => {this.toggleState('open_modal', e)}} name="Connexion"/>
          <Modal open={this.state.open_modal}>
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
