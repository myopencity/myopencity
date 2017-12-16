import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Loader, Header, Container} from 'semantic-ui-react'
import {Projects} from '/imports/api/projects/projects'
import ProjectForm from '/imports/components/projects/ProjectForm'

export class EditProjectPage extends TrackerReact(Component){

  /*
    required props:
      - shorten_url: String
  */

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    const {loading, project} = this.props

    if(!loading){
      return(
        <Grid stackable>
          <Grid.Column width={16} className="center-align">
            <Header as="h1">Édition de votre projet</Header>
            <Container>
              <ProjectForm project={project} />
            </Container>
          </Grid.Column>
        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement du projet</Loader>
    }
  }
}

export default EditProjectPageContainer = createContainer(({ match }) => {
  const {shorten_url} = match.params
  const user_id = Meteor.isClient ? Meteor.userId() : this.userId
  const ProjectsPublication = Meteor.isClient && Meteor.subscribe('project', shorten_url)
  const loading = Meteor.isClient && !ProjectsPublication.ready()
  const project = Projects.findOne({shorten_url: shorten_url, author: user_id})
  return {
    loading,
    project
  }
}, EditProjectPage)
