import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Image, Form, Input, Button, Header, Container} from 'semantic-ui-react'
import { createContainer } from 'meteor/react-meteor-data'
import EditProfileForm from '/imports/components/accounts/EditProfileForm'

export class MyProfile extends TrackerReact(Component){

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
    const {user, loading} = this.props

    if(!loading){
      return(
        <Grid stackable className="wow fadeInUp">
          <Grid.Column width={16} className="center-align">
            <Image src={user && user.profile.avatar_url} size="medium" shape='circular' className="inline-block" />
            <Header as="h1">Édition de votre profil</Header>
          </Grid.Column>
          <Grid.Column width={16}>
            <Container>
              <EditProfileForm />
            </Container>
          </Grid.Column>
        </Grid>
      )
    }else{
      return <div></div>
    }
  }
}

export default MyProfileContainer = createContainer(() => {
  const user_id = Meteor.isClient ? Meteor.userId() : this.userId
  console.log("USER ID", user_id, this.userId);

  const currentUserPublication = Meteor.isClient && Meteor.subscribe('user.me')
  const loading = Meteor.isClient && !currentUserPublication.ready()
  const user = Meteor.users.findOne({_id: user_id})
  return {
    loading,
    user
  }
}, MyProfile)
