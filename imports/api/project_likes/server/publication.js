import {Meteor} from 'meteor/meteor'
import {ProjectLikes} from '../project_likes'

Meteor.publish('project_likes.all', function(){
  if(!Roles.userIsInRole(this.userId, 'admin')){
    throw new Meteor.Error('403', "Vous devez être administrateur")
  }else{
    return ProjectLikes.find({})
  }
})

Meteor.publish('project_likes.by_project', function(project_id){
    return ProjectLikes.find({project: project_id, user: this.userId})
})
