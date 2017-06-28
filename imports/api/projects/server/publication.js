import {Meteor} from 'meteor/meteor'
import {Projects} from '../projects'

Meteor.publish('projects.all', function(){
  if(Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
    return Projects.find({})
  }
})

Meteor.publish('projects.me', function(){
  return Projects.find({author: this.userId})
})

Meteor.publish('projects.visible', function(){
  return Projects.find({visible: true, validated: true})
})

Meteor.publish('project', function(shorten_url){
  return Projects.find({shorten_url: shorten_url, validated: true})
})

Meteor.publish('project.author', function(author_id){
  return Meteor.users.find({_id: author_id})
})
