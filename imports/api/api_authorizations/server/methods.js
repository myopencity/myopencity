import {Meteor} from 'meteor/meteor'
import {ApiAuthorization} from '../api_authorizations'

Meteor.methods({
  'api_authorizations.insert'(api_authorization){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      ApiAuthorization.insert(api_authorization)
    }
  },
  'api_authorizations.update'(api_authorization){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      ApiAuthorization.update({_id: api_authorization._id}, {$set: api_authorization})
    }
  },
  'api_authorizations.remove'(api_authorization_id){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      ApiAuthorization.remove({_id: api_authorization_id})
    }
  }
})
