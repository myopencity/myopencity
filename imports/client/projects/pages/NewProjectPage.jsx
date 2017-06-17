import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Container} from 'semantic-ui-react'
import ProjectForm from '../ui/ProjectForm'

export class NewProjectPage extends TrackerReact(Component){

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
    const {loading, parent_project} = this.props

    if(!loading){

    }else{
      return <Loader className="inline-block">Chargement du projet parent</Loader>
    }
    return(
       <Grid stackable>
         <Grid.Column width={16} className="center-align">
            <Header as="h1">Création d'un nouveau projet</Header>
            <Container>
              <ProjectForm />
            </Container>
         </Grid.Column>
       </Grid>
    )
  }
}

export default NewProjectPageContainer = createContainer(({ parent_shorten_url }) => {
  if(parent_shorten_url){
    const ProjectsPublication = Meteor.subscribe('project', parent_shorten_url)
    const loading = !ProjectsPublication.ready()
    const parent_project = Projects.findOne({shorten_url: parent_shorten_url})
    return {
      loading,
      parent_project
    }
  }else{
    return {
      loading: false
    }
  }
}, NewProjectPage)
