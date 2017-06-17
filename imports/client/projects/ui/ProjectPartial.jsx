import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Card, Image, Button} from 'semantic-ui-react'
import _ from 'lodash'

export default class ProjectPartial extends TrackerReact(Component){

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
          title: "Erreur lors de la modification de la projectation",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        Bert.alert({
          title: "Projectation modifiée",
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
    const {project, hideButtons} = this.props
    const {display_manage_buttons, remove_confirm} = this.state

    if(project){
      return(
        <Card className="inline-block">
          <Image src={project.image_url} />
          <Card.Content>
            <Card.Header>
              {project.title}
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
              {project.author == this.userId ?
                <div>
                  <Button fluid active={display_manage_buttons} onClick={(e) => {this.toggleState('display_manage_buttons', e)}}>Gérer</Button>
                  {display_manage_buttons ?
                    <div>
                      {/* <Button onClick={(e) => {this.go('AdminProjectEdit', {project_shorten_url: project.shorten_url}, e)}} fluid>Modifier</Button> */}
                      <Button onClick={(e) => {this.toggleEditProject('visible', e)}} fluid>{project.visible ? "Rendre invisible" : "Rendre visible"}</Button>
                      {remove_confirm ?
                        <div className="wow fadeInUp">
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
                </Card.Content>
          : ''}
        </Card>
      )
    }else{
      return <div></div>
    }
  }
}
