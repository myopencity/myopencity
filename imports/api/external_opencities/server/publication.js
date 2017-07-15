import {Meteor} from 'meteor/meteor'
import {ExternalOpencities} from '../external_opencities'

Meteor.publish('external_opencities.all', function(){
  if(Roles.userIsInRole(this.userId, 'admin')){
    return ExternalOpencities.find({})
  }
})
