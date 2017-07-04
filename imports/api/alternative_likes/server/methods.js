import {Meteor} from 'meteor/meteor'
import {AlternativeLikes} from '../alternative_likes'

Meteor.methods({
  'alternative_likes.insert'(alternative_like){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      AlternativeLikes.insert(alternative_like)
    }
  },
  'alternative_likes.update'(alternative_like){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      AlternativeLikes.update({_id: alternative_like._id}, {$set: alternative_like})
    }
  },
  'alternative_likes.remove'(alternative_like_id){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      AlternativeLikes.remove({_id: alternative_like_id})
    }
  }
})
