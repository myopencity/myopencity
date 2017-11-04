import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Menu, Container, Sidebar, Icon} from 'semantic-ui-react'
import NavbarAccountItem from '/imports/components/navigation/NavbarAccountItem'

export default class Navbar extends TrackerReact(Component){

  constructor(props){
    super(props)
    this.state = {
      open_sidebar: false
    }
  }

  componentDidMount(){
    this.setState({screen_size: window.innerWidth})
  }

  toggleSidebar(e){
    e.preventDefault()
    Session.set('open_sidebar', !Session.get('open_sidebar'))
  }

  go(route, e){
    e.preventDefault()
    FlowRouter.go(route)
  }

  render(){
    const {navbar_color, main_title} = Session.get('global_configuration')

    return(
      <div>
        {this.state.screen_size > 768 ?
          <Menu secondary className="main-navbar" size="massive" style={{backgroundColor: navbar_color}}>
            <Container>
              <Menu.Item className="navbar-item" onClick={(e) => {this.go('Landing', e)}} header>
                {Session.get('global_configuration').main_title}
              </Menu.Item>
              <Menu.Item className="navbar-item" name='Consultations' onClick={(e) => {this.go('Consults', e)}}/>
              <Menu.Item className="navbar-item" name='Propositions' onClick={(e) => {this.go('Projects', e)}}/>
              <Menu.Menu position='right'>
                <NavbarAccountItem />
              </Menu.Menu>
            </Container>
          </Menu>
          :
          <Menu secondary className="main-navbar" size="large" style={{backgroundColor: navbar_color}}>
            <Container>
              <Menu.Item className="navbar-item" icon="content" onClick={(e) => {this.toggleSidebar(e) }} header/>
            </Container>
          </Menu>
        }
      </div>
    )
  }
}
