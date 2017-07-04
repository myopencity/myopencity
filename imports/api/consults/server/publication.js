import {Meteor} from 'meteor/meteor'
import {Consults} from '../consults'

Meteor.publish('consults.all', function(){
  return Consults.find()
})

Meteor.publish('consults.visible', function(){
  return Consults.find({visible: true})
})

Meteor.publish('consult', function(urlShorten){
  return Consults.find({url_shorten: urlShorten, visible: true})
})

Meteor.publish('consult.admin_by_shorten_url', function(urlShorten){
  return Consults.find({url_shorten: urlShorten})
})
