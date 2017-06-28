import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Image, Button} from 'semantic-ui-react'

export default class AdminProjectPartial extends TrackerReact(Component){

  /*
    required props:
      - project: Object
  */

  constructor(props){
    super(props);
    this.state = {

    }
  }

  go(route, params, e){
    FlowRouter.go(route, params)
  }

  toggle_lock(e){
    e.preventDefault()
    Meteor.call('projects.toggle_lock', this.props.project._id, (error, result) => {
      if(error){
        console.log(error)
        Bert.alert({
          title: "Erreur lors de la gestion du blocage",
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

  render(){
    const {project} = this.props
    return(
      <div className="admin-project-partial wow fadeInLeft left-align">
          <Image shape="rounded" size="small" src={project.image_url} floated="left" />
          <p className="project-title wow fadeInUp" data-wow-delay="0.25s">
            {project.title}
          </p>
          <Button icon="eye" content="Voir" onClick={(e) => {this.go('Project', project.shorten_url, e)}} />
          <Button color='red' icon={project.blocked ? "unlock" : "lock"} content={project.blocked ? "Débloquer" : "Bloquer"} onClick={(e) => {this.toggle_lock(e)}} />
      </div>
    )
  }
}
