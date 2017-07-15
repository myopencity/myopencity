import {Meteor} from 'meteor/meteor'
import {Configuration} from '../configuration'

Meteor.methods({
  'configuration.update'(config){
    if(!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin')){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      config.initial_configuration = false
      Configuration.update({}, {$set: config})
    }
  }
})
