import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Menu, Container} from 'semantic-ui-react'
import NavbarAccountItem from '/imports/client/general/ui/NavbarAccountItem'

export default class Navbar extends TrackerReact(Component){

  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    const navbar_color = Session.get('global_configuration').navbar_color

    return(
      <Menu secondary className="main-navbar" size="big" style={{backgroundColor: navbar_color}}>
        <Container>
          <Menu.Item className="navbar-item" name='header' header/>
          <Menu.Item className="navbar-item" name='home'/>
          <Menu.Item className="navbar-item" name='messages'/>
          <Menu.Item className="navbar-item" name='amis'/>
          <Menu.Menu position='right'>
            <NavbarAccountItem />
          </Menu.Menu>
        </Container>
     </Menu>
    )
  }
}
