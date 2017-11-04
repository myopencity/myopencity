import {Meteor} from 'meteor/meteor'
import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Menu, Modal, Dropdown, Image} from 'semantic-ui-react'
import SigninForm from '/imports/components/accounts/SigninForm'

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
        FlowRouter.go('Landing')
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

  onSignupClick(){
    this.setState({open_modal: false})
  }

  render(){
    const current_user = Meteor.user()

    if(current_user){
      const trigger = (
        <Menu.Item className="navbar-item">
          <Image floated="left" avatar src={current_user.profile.avatar_url} /> {current_user.username}
        </Menu.Item>
      )
      return(
        <Dropdown trigger={trigger} icon={null}>
          <Dropdown.Menu>
            <Dropdown.Item onClick={(e) => {this.go('MyProfile', e)}}>Profil</Dropdown.Item>
            <Dropdown.Item onClick={(e) => {this.go('MyProjects', e)}}>Mes propositions</Dropdown.Item>
            {Roles.userIsInRole(Meteor.userId(), ['admin', 'moderator']) ?
              <Dropdown.Item onClick={(e) => {this.go('AdminConsults', e)}}>Admin</Dropdown.Item>
            : ''}
            <Dropdown.Item onClick={this.logout.bind(this)}>Déconnexion</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        )
    }else{
      return (
        <div>
          <Menu.Item className="navbar-item" onClick={(e) => {this.toggleState('open_modal', e)}} name="Connexion"/>
          <Modal className="wow fadeInUp" open={this.state.open_modal} onClose={(e) => {this.toggleState('open_modal', e)}}>
            <Modal.Header className="center-align" as="h1">Connexion</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <SigninForm onSignin={this.onSignin.bind(this)} onSignupClick={this.onSignupClick.bind(this)} />
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </div>
      )
    }
  }
}
