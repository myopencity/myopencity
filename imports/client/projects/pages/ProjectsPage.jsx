import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Button, Loader} from 'semantic-ui-react'
import {Projects} from '/imports/api/projects/projects'
import ProjectPartial from '/imports/client/projects/ui/ProjectPartial'

export class ProjectsPage extends TrackerReact(Component){

  /*
    required props:
      - none
  */

  constructor(props){
    super(props);
    this.state = {

    }
  }

  go(route, params, e){
    e.preventDefault()
    FlowRouter.go(route, params)
  }

  render(){
    const {loading, projects} = this.props
    const {projects_page_header_title} = Session.get('global_configuration')

    if(!loading){
      return(
        <Grid stackable>
          <Grid.Column width={16} className="center-align">
            <Header className="wow fadeInUp" as="h1">{projects_page_header_title}</Header>
            <Button positive size="big" onClick={(e) => {this.go('NewProject', null, e)}}>Proposer un projet</Button>
          </Grid.Column>
          {projects.map((project, index) => {
            return(
              <Grid.Column width={4} key={index} className="center-align wow fadeInUp">
                <ProjectPartial project={project} />
              </Grid.Column>
            )
          })}
        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement des propositions</Loader>
    }
  }
}

export default ProjectsPageContainer = createContainer(({ id }) => {
  const projectsPublication = Meteor.subscribe('projects.visible')
  const loading = !projectsPublication.ready()
  const projects = Projects.find({visible: true, validated: true}).fetch()
  return {
    loading,
    projects
  }
}, ProjectsPage)
