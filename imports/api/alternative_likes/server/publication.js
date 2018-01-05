import {Meteor} from 'meteor/meteor'
import {AlternativeLikes} from '../alternative_likes'

Meteor.publish('alternative_likes.all', function(){
  if(Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
    return AlternativeLikes.find({})
  }
})
