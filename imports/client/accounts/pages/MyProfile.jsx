import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Image, Form, Input, Button, Header, Container} from 'semantic-ui-react'
import EditProfileForm from '/imports/client/accounts/ui/EditProfileForm'

export default class MyProfile extends TrackerReact(Component){

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
    const user = Meteor.user()
    return(
       <Grid stackable className="wow fadeInUp">
         <Grid.Column width={16} className="center-align">
           <Image src={user.profile.avatar_url} size="medium" shape='circular' className="inline-block" />
           <Header as="h1">Édition de votre profil</Header>
         </Grid.Column>
         <Grid.Column width={16}>
           <Container>
             <EditProfileForm />
           </Container>
         </Grid.Column>
       </Grid>
    )
  }
}
