import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Sidebar, Grid, Segment, Button, Menu, Image, Icon, Header, Loader} from 'semantic-ui-react'
import Navbar from '../../imports/client/general/ui/Navbar'
import {Configuration} from '/imports/api/configuration/configuration'

export class AdminLayout extends TrackerReact(Component){

  constructor(props){
    super(props)
    this.state = {
      subscription:{
        configuration: Meteor.subscribe('global_configuration')
      }
    }
  }

  componentWillUnmount(){
    this.state.subscription.configuration.stop()
  }

  componentWillMount(){
    Session.set('open_sidebar', false)
  }

  componentDidMount(){
    new WOW().init()
  }

  configuration(){
    const configuration = Configuration.findOne({})
    Session.set('global_configuration', configuration)
    return configuration
  }

  go(route){
    FlowRouter.go(route)
  }


  render(){
    const configuration = this.configuration()

    if(configuration){
      return (
        <div className="main-container">
          <Sidebar.Pushable>
            <Sidebar as={Menu} animation='push' width='thin' visible={Session.get('open_sidebar')} className="main-sidebar" icon='labeled' vertical inverted>
              <Menu.Item onClick={() => {this.go('AdminConfiguration')}} name='cogs'>
                <Icon name='cogs' />
                Configuration
              </Menu.Item>
              <Menu.Item onClick={() => {this.go('AdminConsults')}} name='comments'>
                <Icon name='comments' />
                Consultations
              </Menu.Item>
              <Menu.Item onClick={() => {this.go('AdminProjects')}} name='projects'>
                <Icon name='lightbulb' />
                Projets
              </Menu.Item>
              <Menu.Item onClick={() => {this.go('AdminApiAuthorizations')}} name='api_authorizations'>
                <Icon name='lightbulb' />
                Autorisations API
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Grid stackable>
                <Grid.Column width={16} className="navbar-container">
                  <Navbar />
                </Grid.Column>
                {window.innerWidth > 768 ?
                  <Grid.Column width={2}>
                    <Menu vertical>
                      <Menu.Item name='configuration' onClick={() => {this.go('AdminConfiguration')}}>
                        <Icon name='cogs' />
                        Configuration
                      </Menu.Item>
                      <Menu.Item name='consultations' onClick={() => {this.go('AdminConsults')}}>
                        <Icon name='comments' />
                        Consultations
                      </Menu.Item>
                      <Menu.Item name='projects' onClick={() => {this.go('AdminProjects')}}>
                        <Icon name='lightbulb' />
                        Projets
                      </Menu.Item>
                      <Menu.Item onClick={() => {this.go('AdminApiAuthorizations')}} name='api_authorizations'>
                        <Icon name='lightbulb' />
                        Autorisations API
                      </Menu.Item>
                    </Menu>
                  </Grid.Column>
                : ''}
                <Grid.Column width={window.innerWidth > 768 ? 14 : 16}>
                  <main>
                    {this.props.content}
                  </main>
                </Grid.Column>
              </Grid>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      )
    }else{
      return <Loader className="inline-block">Chargement de la configuration</Loader>
    }

  }
}
