import {Meteor} from 'meteor/meteor'
import {ApiAuthorizations} from '../api_authorizations'

Meteor.publish('api_authorizations.all', function(){
  if(Roles.userIsInRole(this.userId, 'admin')){
    return ApiAuthorizations.find({})
  }
})
