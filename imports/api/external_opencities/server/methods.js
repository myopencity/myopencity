import {Meteor} from 'meteor/meteor'
import {ExternalOpencities} from '../external_opencities'

Meteor.methods({
  'external_opencities.insert'(external_opencity){
    if(!Roles.userIsInRole(this.userId, 'admin')){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      ExternalOpencities.insert(external_opencity)
    }
  },
  'external_opencities.update'(external_opencity){
    if(!Roles.userIsInRole(this.userId, 'admin')){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      ExternalOpencities.update({_id: external_opencity._id}, {$set: external_opencity})
    }
  },
  'external_opencities.remove'(external_opencity_id){
    if(!Roles.userIsInRole(this.userId, 'admin')){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      ExternalOpencities.remove({_id: external_opencity_id})
    }
  }
})
