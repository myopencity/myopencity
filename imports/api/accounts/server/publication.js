import {Meteor} from 'meteor/meteor'

Meteor.publish('user.profile', function(user_id){
  return Meteor.users.find({_id: user_id}, {fields: {username: 1, profile: 1}})
})
