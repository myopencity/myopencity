import {Meteor} from 'meteor/meteor'
import {Projects} from '../projects'

Meteor.publish('projects.all', function(){
  if(Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
    return Projects.find({})
  }
})

Meteor.publish('projects.visible', function(){
  return Projects.find({visible: true, validated: true, blocked: false})
})

Meteor.publish('project', function(shorten_url){
  if(Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
    return Projects.find({shorten_url: shorten_url})
  }else{
    return Projects.find({shorten_url: shorten_url, validated: true, blocked: false})
  }
})

Meteor.publish('project.by_id', function(project_id){
  return Projects.find({_id: project_id, validated: true})
})

Meteor.publish('project.author', function(author_id){
  return Meteor.users.find({_id: author_id})
})

Meteor.publish('projects.me', function(){
  return Projects.find({author: this.userId})
})

Meteor.publish('projects.landing', function(){
  return Projects.find({landing_display: true})
})
