import {Meteor} from 'meteor/meteor'
import {Projects} from '../projects'
import _ from 'lodash'

const generate_shorten_url = (title) => {
  return _.random(100,9999) + '-' + _.kebabCase(title)
}

Meteor.methods({
  'projects.insert'(project){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      project.author = this.userId
      project.shorten_url = generate_shorten_url(project.title)
      Projects.insert(project)
    }
  },
  'projects.update'(project){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      const project = Project.findOne({_id: project._id, author: this.userId})
      if(project){
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
      const project = Project.findOne({_id: project_id, author: this.userId})
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
  }
})
