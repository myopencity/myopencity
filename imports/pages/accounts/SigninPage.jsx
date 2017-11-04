import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Header, Container} from 'semantic-ui-react'
import SigninForm from '/imports/components/accounts/SigninForm'
import {withRouter} from 'react-router-dom'

class SigninPage extends TrackerReact(Component){

  /*
    required params:
  */

  constructor(props){
    super(props);
    this.state = {

    }
  }

  signed_in(){
    this.props.history.push('/')
  }

  render(){
    return(
       <Grid stackable centered className="wow fadeInUp">
         <Container>
           <Grid.Column width={16} className="center-align">
             <Header as="h1">Connexion</Header>
           </Grid.Column>
           <Grid.Column width={16}>
             <SigninForm onSignin={this.signed_in.bind(this)}/>
           </Grid.Column>
         </Container>
       </Grid>
    )
  }
}

export default withRouter(SigninPage)
