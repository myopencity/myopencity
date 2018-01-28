import React, { Component } from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import { Loader, Grid, Header, Image, Container, Statistic } from 'semantic-ui-react'
import AvatarImage from '/imports/components/accounts/AvatarImage'

export class ProfilePage extends TrackerReact(Component) {

  /*
    required props:
      - user_id: String
  */

  state = {
    stats: { projects: 0, votes: 0, alternatives: 0, project_likes: 0 }
  }

  componentDidMount() {
    window.scrollTo(0,0)
    Meteor.call('users.profile_stats', this.props.user._id, (error, result) => {
      if (error) {
        console.log(error)
      } else {
        this.setState({ stats: result })
      }
    });
  }

  render() {
    const { user, loading } = this.props
    const { stats } = this.state

    if (!loading) {
      return (
        <Grid stackable className="main-container" verticalAlign="middle">
          <Grid.Column width={8} className="center-align">
            <AvatarImage src={user.profile.avatar_url} className="wow fadeInUp" />
            <Header className="wow fadeInDown" data-wow-delay="0.2s" as="h1">{user.username}</Header>
          </Grid.Column>
          <Grid.Column width={8} className="profile-description">
            {user.profile.description ?
              <Grid stackable>
                <Grid.Column width={16} >
                  <Header as='h2' className="wow fadeInUp" >À PROPOS DE MOI</Header>
                  <div className="wow fadeInUp" data-wow-delay="0.5s" dangerouslySetInnerHTML={{ __html: user.profile.description }}></div>
                </Grid.Column>
                <Grid.Column className="center-align" computer={4} mobile={8}>
                  <Statistic className="wow fadeInDown" data-wow-delay="0.2s">
                    <Statistic.Value>{stats.projects}</Statistic.Value>
                    <Statistic.Label>Propositions</Statistic.Label>
                  </Statistic>
                </Grid.Column>
                <Grid.Column className="center-align" computer={4} mobile={8}>
                  <Statistic className="wow fadeInDown" data-wow-delay="0.4s">
                    <Statistic.Value>{stats.project_likes}</Statistic.Value>
                    <Statistic.Label>Soutiens</Statistic.Label>
                  </Statistic>
                </Grid.Column>
                <Grid.Column className="center-align" computer={4} mobile={8}>
                  <Statistic className="wow fadeInDown" data-wow-delay="0.6s">
                    <Statistic.Value>{stats.votes}</Statistic.Value>
                    <Statistic.Label>Votes</Statistic.Label>
                  </Statistic>
                </Grid.Column>
                <Grid.Column className="center-align" computer={4} mobile={8}>
                  <Statistic className="wow fadeInDown" data-wow-delay="0.7s">
                    <Statistic.Value>{stats.alternatives}</Statistic.Value>
                    <Statistic.Label>Alternatives</Statistic.Label>
                  </Statistic>
                </Grid.Column>



              </Grid>
              :
              <div>
                <Header as='h1'>Cette personne n'a encore rien rédigé à propos d'elle</Header>
              </div>
            }
          </Grid.Column>
        </Grid>
      )
    } else {
      return <Loader className="inline-block">Chargement du profil de l'utilisateur</Loader>
    }

  }
}

export default ProfilePageContainer = createContainer(({ match }) => {
  const { user_id } = match.params
  const userProfilePublication = Meteor.isClient && Meteor.subscribe('user.profile', user_id)
  const loading = Meteor.isClient && !userProfilePublication.ready()
  const user = Meteor.users.findOne({ _id: user_id })
  return {
    loading,
    user
  }
}, ProfilePage)
