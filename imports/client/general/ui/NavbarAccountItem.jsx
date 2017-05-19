import {Meteor} from 'meteor/meteor'
import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Menu, Modal} from 'semantic-ui-react'

export default class NavbarAccountItem extends TrackerReact(Component){

  /*
    required props:
      - none
  */

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    const current_user = Meteor.user()

    if(current_user){
      return(
        <Menu.Item className="navbar-item">{current_user.username}</Menu.Item>
        )
    }else{
      return <Menu.Item className="navbar-item" name="Connexion"/>
    }
  }
}
