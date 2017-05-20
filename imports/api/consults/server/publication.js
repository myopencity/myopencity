import {Meteor} from 'meteor/meteor'
import {Consults} from '../consults'

Meteor.publish('consults.all', function(){
  return Consults.find()
})

Meteor.publish('consults.visible', function(){
  return Consults.find({visible: true})
})
