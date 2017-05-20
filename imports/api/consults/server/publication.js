import {Meteor} from 'meteor/meteor'
import {Consults} from '../consults'

Meteor.publish('consults.all', function(){
  console.log("CHECK");

  return Consults.find()
})
