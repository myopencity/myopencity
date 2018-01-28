import React, { Component } from 'react'
import { Grid, Image, Form, Input, Button, Header, Container } from 'semantic-ui-react'
import { withTracker } from 'meteor/react-meteor-data'
import EditProfileForm from '/imports/components/accounts/EditProfileForm'
import AvatarImage from '/imports/components/accounts/AvatarImage'
import { Link } from 'react-router-dom'

export class MyProfile extends Component {

  /*
    required props:
      - none
  */

  handleDescriptionChange(e) {
    let { user_profile } = this.state
    user_profile.description = e.target.getContent()
    this.setState({ user_profile })
  }

  handleProfileChange(attr, e) {
    let { user_profile } = this.state
    user_profile[attr] = e.target.value
    this.setState({ user_profile })
  }

  edit_profile(e) {
    e.preventDefault()
    const { user_profile } = this.state

    Meteor.call('user.edit_profile', user_profile, (error, result) => {
      if (error) {
        console.log(error)
        Bert.alert({
          title: "Erreur lors de la modification de votre profil",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      } else {
        Bert.alert({
          title: "Votre profil a bien été modifié",
          type: 'success',
          style: 'growl-bottom-left',
        })
      }
    });
  }

  render() {
    const { user, loading } = this.props
    if (!loading) {
      return (
        <Grid stackable className="main-container" verticalAlign="middle">
          <Grid.Column width={8} className="center-align">
            <AvatarImage src={user.profile.avatar_url} size="medium" className="wow fadeInUp" avatar />
          </Grid.Column>
          <Grid.Column width={8} className="wow fadeIn">
            <Header as="h1">Dîtes-nous en un peu plus sur vous</Header>
            <Link to={Meteor.isClient && ("/profile/" + Meteor.userId())} >
              <Button size="mini" content="Voir mon profil public" />
            </Link>
            <EditProfileForm />
          </Grid.Column>
        </Grid>
      )
    } else {
      return <div></div>
    }
  }
}

export default MyProfileContainer = withTracker(() => {
  const user_id = Meteor.isClient ? Meteor.userId() : this.userId

  const currentUserPublication = Meteor.isClient && Meteor.subscribe('user.me')
  const loading = Meteor.isClient && !currentUserPublication.ready()
  const user = Meteor.users.findOne({ _id: user_id })
  return {
    loading,
    user
  }
})(MyProfile)
