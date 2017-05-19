import {Meteor} from 'meteor/meteor'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Grid, Container, Loader, Sidebar, Icon, Menu} from 'semantic-ui-react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import Navbar from '../../imports/client/general/ui/Navbar'
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

  configuration(){
    const configuration = Configuration.findOne({})
    Session.set('global_configuration', configuration)
    return configuration
  }

  render(){
    const configuration = this.configuration()

    if(configuration){
      return (
        <div className="main-container">
          <Sidebar.Pushable>
            <Sidebar as={Menu} animation='push' width='thin' visible={Session.get('open_sidebar')} className="main-sidebar" icon='labeled' vertical inverted>
              <Menu.Item name='home'>
                <Icon name='home' />
                Home
              </Menu.Item>
              <Menu.Item name='gamepad'>
                <Icon name='gamepad' />
                Games
              </Menu.Item>
              <Menu.Item name='camera'>
                <Icon name='camera' />
                Channels
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Grid>
                <Grid.Column width={16}>
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
