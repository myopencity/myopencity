import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Menu, Container} from 'semantic-ui-react';

export default class Navbar extends TrackerReact(Component){

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <Menu secondary className="main-navbar">
        <Container>
          <Menu.Item className="navbar-item" name='header' header/>
          <Menu.Item className="navbar-item" name='home'/>
          <Menu.Item className="navbar-item" name='messages'/>
          <Menu.Item className="navbar-item" name='amis'/>
          <Menu.Menu position='right'>
            <Menu.Item className="navbar-item" name='logout'/>
          </Menu.Menu>
        </Container>
     </Menu>
    )
  }
}
