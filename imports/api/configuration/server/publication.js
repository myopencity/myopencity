import {Meteor} from 'meteor/meteor'
import {Configuration} from '../configuration'

Meteor.publish('global_configuration', function(){
  return Configuration.find({}, {fields : {cgu: 0}})
})

Meteor.publish('configuration.with_cgu', function(){
  return Configuration.find()
})

