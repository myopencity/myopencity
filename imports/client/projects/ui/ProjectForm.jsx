import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import TinyMCE from 'react-tinymce'
import {Grid, Header, Form, Input, Button, Icon} from 'semantic-ui-react'

export class ProjectForm extends TrackerReact(Component){

  /*
    required props:
      - none
  */

  constructor(props){
    super(props);
    this.state = {
      editing_project: {
        anonymous: true
      }
    }
  }

  componentWillReceiveProps(new_props){
    if(new_props.project){
      this.setState({editing_project: new_props.project})
    }
  }

  handleChange(attr, e){
    let {editing_project} = this.state
    editing_project[attr] = e.target.value
    this.setState({editing_project})
  }

  handleContentChange(e){
    let {editing_project} = this.state
    editing_project.content = e.target.getContent()
    this.setState({editing_project})
  }

  submit_form(e){
    e.preventDefault()
    if(this.props.project){
      Meteor.call('projects.update', this.state.editing_project , (error, result) => {
        if(error){
          console.log(error)
          Bert.alert({
            title: "Erreur lors de l'édition du projet",
            message: error.reason,
            type: 'danger',
            style: 'growl-bottom-left',
          })
        }else{
          Bert.alert({
            title: "Votre projet a été modifié",
            type: 'success',
            style: 'growl-bottom-left',
          })
        }
      });
    }else{
      Meteor.call('projects.insert', this.state.editing_project, (error, result) => {
        if(error){
          console.log(error)
          Bert.alert({
            title: "Erreur lors de la création de votre projet",
            message: error.reason,
            type: 'danger',
            style: 'growl-bottom-left',
          })
        }else{
          const {project_validation_enabled} = Session.get('global_configuration')
          const validation_message = project_validation_enabled ? "Votre projet sera visible dès qu'il aura été validé" : ''
          Bert.alert({
            title: "Votre projet a bien été créé",
            message: validation_message,
            type: 'success',
            style: 'growl-bottom-left',
          })
        }
      });
    }
  }

  render(){
    const {loading, project, parent_project} = this.props
    const {editing_project} = this.state

    if(!loading){
      return(
        <Form>
          <Form.Field>
            <label>Titre de la proposition</label>
            <Input value={editing_project.title} type="text" onChange={(e) => {this.handleChange('title', e)}} />
          </Form.Field>
          <Form.Field>
            <label>Décrivez votre projet de la manière la plus précise possible</label>
            <TinyMCE
              content={editing_project.content}
              config={{
                plugins: 'image',
                toolbar: "undo redo | bold italic | alignleft aligncenter alignright | code",
                menubar: true,
                branding: false
              }}
              onChange={this.handleContentChange.bind(this)}
              />
          </Form.Field>
          <Form.Field>
            <Button positive onClick={(e) => {this.submit_form(e)}}>{project ? "Éditer" : "Créer"}</Button>
          </Form.Field>
        </Form>
      )
    }else{
      return <Loader className="inline-block">Chargement du formulaire</Loader>
    }
  }
}

export default ProjectFormContainer = createContainer(({ project }) => {
  if(project){
    const ProjectsPublication = Meteor.subscribe('project', project.parent )
    const loading = !ProjectsPublication.ready()
    const parent_project = Projects.findOne({_id: project.parent})
    return {
      loading,
      parent_project
    }
  }else{
    return {
      loading: false
    }
  }
}, ProjectForm)
