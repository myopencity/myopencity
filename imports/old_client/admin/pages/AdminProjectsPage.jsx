import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Projects} from '/imports/api/projects/projects'
import {Grid, Header, Loader, Container} from 'semantic-ui-react'
import AdminProjectPartial from '/imports/client/projects/ui/AdminProjectPartial'

export class AdminProjectsPage extends TrackerReact(Component){

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
            <Header as="h1">Gestion des projets citoyens</Header>
          </Grid.Column>
          <Grid.Column width={16} className="center-align">
            <Container>
              <Grid stackable>
                {projects.map((project, index) => {
                  return(
                    <Grid.Column width={16}>
                      <AdminProjectPartial project={project} key={index} />
                    </Grid.Column>
                  )
                })}
              </Grid>
            </Container>
          </Grid.Column>
        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement des projets citoyens</Loader>
    }
  }
}

export default AdminProjectsPageContainer = createContainer(({ id }) => {
  const ProjectsPublication = Meteor.subscribe('projects.all')
  const loading = !ProjectsPublication.ready()
  const projects = Projects.find({}, {sort: {likes: -1}}).fetch()
  return {
    loading,
    projects
  }
}, AdminProjectsPage)
