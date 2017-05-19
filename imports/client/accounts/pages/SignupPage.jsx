import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Header, Container} from 'semantic-ui-react'
import SignupForm from '../ui/SignupForm'

export default class SignupPage extends TrackerReact(Component){

  /*
    required params:
  */

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
       <Grid centered>
         <Container>
           <Grid.Column width={16} className="center-align">
             <Header as="h1">Inscription</Header>
           </Grid.Column>
           <Grid.Column width={16}>
             <SignupForm />
           </Grid.Column>
         </Container>
       </Grid>
    )
  }
}
