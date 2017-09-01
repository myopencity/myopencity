import {Meteor} from 'meteor/meteor'
import {Configuration} from '../configuration'

Meteor.methods({
  'configuration.update'(config){
    if(!Roles.userIsInRole(this.userId, 'admin')){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      console.log("config call", config);

      config.initial_configuration = false
      Configuration.update({}, {$set: config})
    }
  }
})
