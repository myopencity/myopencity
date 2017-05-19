import {Meteor} from 'meteor/meteor'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Grid, Container, Loader} from 'semantic-ui-react'
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
        <Grid>
          <Grid.Column width={16}>
            <header>
              <Navbar />
            </header>
          </Grid.Column>
          <Grid.Column width={16}>
            <main>
              {this.props.content}
            </main>
          </Grid.Column>
        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement</Loader>
    }

  }
}
