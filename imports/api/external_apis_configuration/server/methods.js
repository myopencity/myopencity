import {Meteor} from 'meteor/meteor'
import {ExternalApisConfiguration} from '../external_apis_configuration'
import {Configuration} from '/imports/api/configuration/configuration'

Meteor.methods({
  'external_apis_configuration.amazon_update'({amazon_public_key, amazon_private_key}){
    if(!Roles.userIsInRole(this.userId, 'admin')){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      ExternalApisConfiguration.update({}, {$set: {amazon_public_key, amazon_private_key}})
      if(amazon_public_key, amazon_private_key){
        Configuration.update({}, {$set: {amazon_connected: true}})
      }
    }
  }
})
