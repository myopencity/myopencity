import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Header, Button} from 'semantic-ui-react'

export default class AdminConsultsPage extends TrackerReact(Component){

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
    return(
       <Grid stackable className="wow fadeInLeft">
         <Grid.Column width={16} className="center-align">
           <Header as="h1">Gestion des consultations</Header>
         </Grid.Column>
         <Grid.Column width={16}>

         </Grid.Column>
       </Grid>
    )
  }
}
