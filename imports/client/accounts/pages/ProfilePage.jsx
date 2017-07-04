import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Loader, Grid, Header, Image, Container} from 'semantic-ui-react'

export class ProfilePage extends TrackerReact(Component){

  /*
    required props:
      - user_id: String
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
        <Grid stackable className="wow fadeInUp marged">
          <Grid.Column width={16} className="center-align">
            <Image src={user.profile.avatar_url} size="medium" shape='circular' className="inline-block" />
            <Header as="h1">{user.username}</Header>
          </Grid.Column>
          {user.profile.description ?
            <Grid.Column width={16}>
              <Container>
                <div dangerouslySetInnerHTML={{__html: user.profile.description }}></div>
              </Container>
            </Grid.Column>
          : ''}
        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement du profil de l'utilisateur</Loader>
    }

  }
}

export default ProfilePageContainer = createContainer(({ user_id }) => {
  const userProfilePublication = Meteor.subscribe('user.profile', user_id)
  const loading = !userProfilePublication.ready()
  const user = Meteor.users.findOne({_id: user_id})
  return {
    loading,
    user
  }
}, ProfilePage)
