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
  },
  'external_apis_configuration.google_update'({google_public_key, google_private_key}){
    if(!Roles.userIsInRole(this.userId, 'admin')){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      ExternalApisConfiguration.update({}, {$set: {google_public_key, google_private_key}})
      if(google_public_key, google_private_key){
        Configuration.update({}, {$set: {google_connected: true}})
        ServiceConfiguration.configurations.upsert({
          service: "google"
        }, {
          $set: {
            clientId: google_public_key,
            loginStyle: "popup",
            secret: google_private_key
          }
        })
      }
    }
  },
  'external_apis_configuration.facebook_update'({facebook_public_key, facebook_private_key}){
    if(!Roles.userIsInRole(this.userId, 'admin')){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      ExternalApisConfiguration.update({}, {$set: {facebook_public_key, facebook_private_key}})
      if(facebook_public_key, facebook_private_key){
        Configuration.update({}, {$set: {facebook_connected: true}})
        ServiceConfiguration.configurations.upsert({
          service: "facebook"
        }, {
          $set: {
            appId: facebook_public_key,
            loginStyle: "popup",
            secret: facebook_private_key
          }
        })
      }
    }
  }
})
