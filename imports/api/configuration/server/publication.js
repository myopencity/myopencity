import {Meteor} from 'meteor/meteor'
import {Configuration} from '../configuration'

Meteor.publish('global_configuration', function(){
  return Configuration.find({})
})
