import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Projects} from '/imports/api/projects/projects'
import {Grid, Header, Loader, Container} from 'semantic-ui-react'

export class ProjectPage extends TrackerReact(Component){

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
    const {project, loading} = this.props
    const {
      project_header_height,
      project_header_color,
      project_description_background_color,
      project_description_color,
      project_description_font_size
    } = Session.get('global_configuration')

    if(!loading){
      return(
        <Grid stackable className="wow fadeInUp">
          <Grid.Column
            width={16}
            className="center-align project-header"
            style={{
              backgroundImage: "url('" + project.image_url + "')",
              height: project_header_height
            }}>
            <Grid verticalAlign="middle" className="project-header-inner-grid">
              <Grid.Column width={16} className="center-align">
                <Header className="wow fadeInUp" data-wow-delay="1s" as="h1" style={{color: project_header_color}}>{project.title}</Header>
              </Grid.Column>
            </Grid>
          </Grid.Column>
          {project.description ?
            <Grid.Column width={16} style={{fontSize: project_description_font_size, backgroundColor: project_description_background_color, color: project_description_color}} className="project-description-container center-align">
              <Container>
                <p>{project.description}</p>
              </Container>
            </Grid.Column>
            : ''}
            <Container>
              <Grid.Column width={16} className="project-content-container">
                <div dangerouslySetInnerHTML={{__html: project.content }}></div>
              </Grid.Column>
            </Container>
          </Grid>
        )
    }else{
      return <Loader className="inline-block">Chargement du projet</Loader>
    }
  }
}

export default ProjectPageContainer = createContainer(({ shorten_url }) => {
  const ProjectsPublication = Meteor.subscribe('project', shorten_url)
  const loading = !ProjectsPublication.ready()
  const project = Projects.findOne({shorten_url: shorten_url})
  return {
    loading,
    project
  }
}, ProjectPage)
