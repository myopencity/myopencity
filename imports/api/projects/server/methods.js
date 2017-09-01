import {Meteor} from 'meteor/meteor'
import {Projects} from '../projects'
import _ from 'lodash'
import {ProjectLikes} from '/imports/api/project_likes/project_likes'
import {Configuration} from '/imports/api/configuration/configuration'

const generate_shorten_url = (title) => {
  return _.random(100,9999) + '-' + _.kebabCase(title)
}

Meteor.methods({
  'projects.insert'(project){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      const configuration = Configuration.findOne({})
      if(!configuration.projects_anonymous_choice){
        project.anonymous = configuration.projects_anonymous_default
      }
      project.author = this.userId
      project.shorten_url = generate_shorten_url(project.title)
      Projects.insert(project)
    }
  },
  'projects.update'(project){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      const found_project = Projects.findOne({_id: project._id, author: this.userId})
      if(found_project){
        project.updated_at = new Date()
        Projects.update({_id: project._id}, {$set: project})
      }else{
        throw new Meteor.Error('Apparement ce projet ne vous appartient pas')
      }
    }
  },
  'projects.remove'(project_id){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      const project = Projects.findOne({_id: project_id, author: this.userId})
      if(project){
        Projects.remove({_id: project_id})
      }else{
        throw new Meteor.Error('Apparement ce projet ne vous appartient pas')
      }
    }
  },
  'project.toggleValidity'(project_id){
    if(!Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      let project = Projects.findOne({_id: project_id})
      project.validated = !project.validated
      Projects.update({_id: project._id}, {$set: project})
    }
  },
  'project.toggle_like'(project_id){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      let project = Projects.findOne({_id: project_id})
      const project_like = ProjectLikes.findOne({project: project_id, user: this.userId})
      if(project_like){
        ProjectLikes.remove(project_like._id)
        project.likes--
      }else{
        ProjectLikes.insert({project: project_id, user: this.userId})
        project.likes++
      }
      Projects.update({_id: project._id}, {$set: project})
    }
  },
  'projects.toggle_lock'(project_id){
    if(!Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      let project = Projects.findOne({_id: project_id})
      project.blocked = !project.blocked
      Projects.update({_id: project._id}, {$set: project})
    }
  },
  'projects.admin_toggle'({project_id, attr}){
    if(!Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      let project = Projects.findOne({_id: project_id})
      project[attr] = !project[attr]
      Projects.update({_id: project._id}, {$set: project})
    }
  }
})
