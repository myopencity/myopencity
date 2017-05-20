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

  componentDidMount(){
    new WOW().init()
  }

  configuration(){
    const configuration = Configuration.findOne({})
    Session.set('global_configuration', configuration)
    console.log("configuration", configuration)

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
            <Sidebar as={Menu} animation='push' width='thin' visible={true} className="main-sidebar" icon='labeled' vertical inverted>
              <Menu.Item name='home'>
                <Icon name='home' />
                Home
              </Menu.Item>
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
      return <Loader className="inline-block">Chargement de la configuration</Loader>
    }

  }
}
