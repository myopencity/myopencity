import React, {Component} from 'react'
import {Card, Image, Button, Icon} from 'semantic-ui-react'
import { createContainer } from 'meteor/react-meteor-data'
import _ from 'lodash'

export class ProjectPartial extends Component{

  /*
    required props:
      - project: Object
    facultative props:
      - hideButtons: Boolean (hide the partial buttons)
  */

  constructor(props){
    super(props)
    this.state = {
      display_manage_buttons: false,
      display_admin_buttons: false,
      remove_confirm: false
    }
  }

  toggleState(attr, e){
    let state = this.state
    state[attr] = !state[attr]
    this.setState(state)
  }

  toggleEditProject(attr, e){
    let project = this.props.project
    project[attr] = !project[attr]
    Meteor.call('projects.update', {project}, (error, result) => {
      if(error){
        console.log(error)
        Bert.alert({
          title: "Erreur lors de la modification du projet",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        Bert.alert({
          title: "Projet modifié",
          type: 'success',
          style: 'growl-bottom-left',
        })
      }
    });
  }

  toggleAdminProject(attr, e){
    let project = this.props.project
    project[attr] = !project[attr]
    Meteor.call('projects.admin_toggle', {project_id: project._id, attr: attr}, (error, result) => {
      if(error){
        console.log(error)
        Bert.alert({
          title: "Erreur lors de la modification du projet",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        Bert.alert({
          title: "Projet modifié",
          type: 'success',
          style: 'growl-bottom-left',
        })
      }
    });
  }

  go(route, params, e){
    e.preventDefault()
    FlowRouter.go(route, params)
  }

  removeProject(e){
    Meteor.call('projects.remove', this.props.project._id, (error, result) => {
      if(error){
        console.log(error)
        Bert.alert({
          title: "Erreur lors de la suppression du projet",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        Bert.alert({
          title: "Le projet a été supprimé",
          type: 'success',
          style: 'growl-bottom-left',
        })
      }
    });
  }

  render(){
    const {project, hideButtons, author, user_id, loading} = this.props
    console.log("user_id", user_id);

    const {display_manage_buttons, display_admin_buttons, remove_confirm} = this.state

    if(!loading){
      return(
        <Card className="inline-block project-partial">
          <Image src={project.image_url} />
          <Card.Content>
            <Card.Header>
              {!project.anonymous ?
                <span className="author-container" style={{cursor: "pointer"}} onClick={(e) => {this.go('Profile', {user_id: author._id}, e)}}><Image src={author.profile.avatar_url} avatar /> {author.username}<br/></span>
                : ''}
              {project.title}
              {project.likes > 0 ?
                <span className="likes-container"><br/><Icon name="thumbs up"/> {project.likes} soutiens</span>
                : ''}
            </Card.Header>
            <Card.Description>
              {display_manage_buttons ?
                <div>
                  <p>{project.visible ? "Projet actuellement visible" : "Projet actuellement caché"}</p>
                </div>
              :
                <div>{_.truncate(project.description, {length: 200, separator: ' '})}</div>
              }
            </Card.Description>
          </Card.Content>
          {!hideButtons ?
            <Card.Content className="center-align" extra>
              <Button onClick={(e) => {this.go('Project', {shorten_url: project.shorten_url}, e)}} fluid>Consulter</Button>
              {project.author == user_id ?
                <div>
                  <Button fluid active={display_manage_buttons} onClick={(e) => {this.toggleState('display_manage_buttons', e)}}>Gérer</Button>
                  {display_manage_buttons ?
                    <div>
                      <Button onClick={(e) => {this.go('EditProject', {shorten_url: project.shorten_url}, e)}} fluid>Modifier</Button>
                      {remove_confirm ?
                        <div className="animated fadeInUp">
                          <p>Vous confirmez ?</p>
                          <Button onClick={(e) => {this.toggleState('remove_confirm', e)}}>Annuler</Button>
                          <Button color="red" onClick={(e) => {this.removeProject(e)}}>Supprimer</Button>
                        </div>
                      :
                        <Button color="red" onClick={(e) => {this.toggleState('remove_confirm', e)}} fluid>Supprimer</Button>
                      }
                    </div>
                    : ''}
                  </div>
                  : ''}
                {Roles.userIsInRole(user_id, ['admin', 'moderator']) ?
                  <div>
                    <Button fluid active={display_admin_buttons} onClick={(e) => {this.toggleState('display_admin_buttons', e)}}>Administrer</Button>
                      {display_admin_buttons ?
                        <div>
                          <Button onClick={(e) => {this.toggleAdminProject('landing_display', e)}} fluid>{project.landing_display ? "Ne plus mettre en avant" : "Mettre en avant"}</Button>
                        </div>
                        : ''}
                </div>
                : ''}
                </Card.Content>
          : ''}
        </Card>
      )
    }else{
      return <div></div>
    }
  }
}

export default ProjectPartialContainer = createContainer(({ project }) => {
  const AuthorPublication = Meteor.isClient && Meteor.subscribe('project.author', project.author)
  const loading = Meteor.isClient && !AuthorPublication.ready()
  const author = Meteor.users.findOne({_id: project.author})
  const user_id = Meteor.isClient ? Meteor.userId() : this.userId
  return {
    loading,
    author,
    user_id
  }
}, ProjectPartial)
