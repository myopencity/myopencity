import {Meteor} from 'meteor/meteor'
import {ApiAuthorizations} from '../api_authorizations'

Meteor.methods({
  'api_authorizations.insert'(api_authorization){
    if(!Roles.userIsInRole(this.userId, 'admin')){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      ApiAuthorizations.insert(api_authorization)
    }
  },
  'api_authorizations.update'(api_authorization){
    if(!Roles.userIsInRole(this.userId, 'admin')){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      ApiAuthorizations.update({_id: api_authorization._id}, {$set: api_authorization})
    }
  },
  'api_authorizations.remove'(api_authorization_id){
    if(!Roles.userIsInRole(this.userId, 'admin')){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      ApiAuthorizations.remove({_id: api_authorization_id})
    }
  }
})
