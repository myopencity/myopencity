import {Meteor} from 'meteor/meteor'
import {Consults} from '../consults'

Meteor.methods({
  'consults.insert'(consult){
    if(!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      consult.author = this.userId
      Consults.insert(consult)
    }
  },
  'consults.update'(consult){
    if(!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      Consults.update({_id: consult._id}, {$set: consult})
    }
  },
  'consults.remove'(consult_id){
    if(!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      Consults.remove({_id: consult_id})
    }
  }
})
