import {Meteor} from 'meteor/meteor'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Grid, Container, Loader, Sidebar, Icon, Menu} from 'semantic-ui-react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import Navbar from '../../imports/components/navigation/Navbar'
import {Configuration} from '/imports/api/configuration/configuration'

export class MainLayout extends TrackerReact(Component){


  constructor(props){
    super(props)
    this.state = {
      subscription:{
        configuration: Meteor.subscribe('global_configuration')
      }
    }
  }

  componentWillMount(){
    Session.set('open_sidebar', false)
  }

  componentWillUnmount(){
    this.state.subscription.configuration.stop()
  }

  componentDidMount(){
    new WOW().init()
  }

  configuration(){
    const configuration = Configuration.findOne({})
    Session.set('global_configuration', configuration)
    if(configuration && configuration.initial_configuration){
      FlowRouter.go('InitialPresentation')
    }
    return configuration
  }

  go(route, e){
    e.preventDefault()
    FlowRouter.go(route)
    Session.set('open_sidebar', false)
  }

  logout(e){
    e.preventDefault()
    Meteor.logout()
  }

  render(){
    const configuration = this.configuration()

    if(configuration){
      return (
        <div className="main-container">
          <Sidebar.Pushable>
            <Sidebar as={Menu} animation='push' width='thin' visible={Session.get('open_sidebar')} className="main-sidebar" icon='labeled' vertical inverted>
              <Menu.Item name='consultations' onClick={(e) => {this.go('Landing', e)}}>
                Accueil
              </Menu.Item>
              <Menu.Item name='consultations' onClick={(e) => {this.go('Consults', e)}}>
                Consultations
              </Menu.Item>
              <Menu.Item name='propositions' onClick={(e) => {this.go('Projects', e)}}>
                Propositions
              </Menu.Item>
              {Meteor.userId() ?
                <span>
                  {Roles.userIsInRole(Meteor.userId(), ['admin', 'moderator']) ?
                    <Menu.Item floated="bottom" name='admin' onClick={(e) => {this.go('AdminConsults', e)}}>
                      Admin
                    </Menu.Item>
                  : ''}
                  <Menu.Item floated="bottom" name='profile' onClick={(e) => {this.go('MyProfile', e)}}>
                    Profil
                  </Menu.Item>
                  <Menu.Item floated="bottom" name='profile' onClick={(e) => {this.logout(e)}}>
                    Déconnexion
                  </Menu.Item>
                </span>
              :
                <Menu.Item name='sign_in' onClick={(e) => {this.go('Signin', e)}}>
                  Connexion
                </Menu.Item>
              }
            </Sidebar>
            <Sidebar.Pusher>
              <Grid>
                <Grid.Column width={16} className="navbar-container">
                  <Navbar />
                </Grid.Column>
                <Grid.Column width={16}>
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
      return <Loader className="inline-block">Chargement</Loader>
    }

  }
}
