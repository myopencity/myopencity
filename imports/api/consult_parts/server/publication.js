import {Meteor} from 'meteor/meteor'
import {ConsultParts} from '../consult_parts'

Meteor.publish('consult_parts.by_consult_url_shorten', function(url_shorten){
  return ConsultParts.find({consult_url_shorten: url_shorten, active: true})
})

Meteor.publish('consult_parts.admin_by_consult_url_shorten', function(url_shorten){
  return ConsultParts.find({consult_url_shorten: url_shorten})
})

Meteor.publish('consult_parts.all', function(){
  return ConsultParts.find({})
})
