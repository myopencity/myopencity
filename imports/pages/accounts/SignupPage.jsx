import React, { Component } from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { Grid, Header, Container, Image } from 'semantic-ui-react'
import SignupForm from '/imports/components/accounts/SignupForm'

export default class SignupPage extends TrackerReact(Component) {

  /*
    required params:
  */

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { global_image_url } = Meteor.isClient && Session.get('global_configuration')

    return (
      <Container>
        <Grid stackable centered className="wow fadeInUp main-container" verticalAlign="middle">
          <Grid.Column width={8} className="center-align">
            <Image src={global_image_url} inline size="medium" className="wow fadeInUp" />
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as="h1">Inscription</Header>
            <SignupForm />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
