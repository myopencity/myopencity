import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Loader, Container} from 'semantic-ui-react'
import {Projects} from '/imports/api/projects/projects'
import ProjectPartial from '/imports/components/projects/ProjectPartial'

export class MyProjectsPage extends TrackerReact(Component){

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
    const {projects, loading} = this.props

    if(!loading){
      return(
        <Grid stackable>
          <Grid.Column width={16} className="center-align">
            <Header as="h1">Vos projets / propositions</Header>
          </Grid.Column>
          <Grid.Column width={16} className="marged">
            <Grid stackable centered>
              {projects.map((project, index) => {
                return (
                  <Grid.Column width={5} className="center-align wow fadeInUp">
                    <ProjectPartial project={project} />
                  </Grid.Column>
                )
              })}
            </Grid>
          </Grid.Column>
        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement de vos projets</Loader>
    }
  }
}

export default MyProjectsPageContainer = createContainer(() => {
  const user_id = Meteor.isClient ? Meteor.userId() : this.userId
  const ProjectsPublication = Meteor.isClient && Meteor.subscribe('projects.me')
  const loading = Meteor.isClient && !ProjectsPublication.ready()
  const projects = Projects.find({author: user_id}).fetch()
  return {
    loading,
    projects
  }
}, MyProjectsPage)
