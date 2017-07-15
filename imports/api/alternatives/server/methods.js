import {Meteor} from 'meteor/meteor'
import {Alternatives} from '../alternatives'
import {ConsultParts} from '/imports/api/consult_parts/consult_parts'
import {AlternativeLikes} from '/imports/api/alternative_likes/alternative_likes'

Meteor.methods({
  'alternatives.insert'({alternative, consult_part_id}){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      const consult_part = ConsultParts.findOne({_id: consult_part_id})
      if(consult_part.alternatives_activated){
        alternative.user = this.userId
        alternative.consult_part = consult_part_id
        alternative.consult = consult_part.consult
        Alternatives.insert(alternative)
      }else{
        throw new Meteor.Error('403', "Les alternatives sont désactivées sur cette partie")
      }
    }
  },
  'alternatives.update'(alternative){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      Alternatives.update({_id: alternative._id}, {$set: alternative})
    }
  },
  'alternatives.remove'(alternative_id){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      const alternative = Alternatives.findOne(alternative_id)
      if(alternative.user == this.userId || Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
        Alternatives.remove({_id: alternative_id})
      }else{
        throw new Meteor.Error('403', "Vous n'êtes pas le propriétaire de cette alternative")
      }
    }
  },
  'alternatives.count_by_part'(consult_part_id){
    return Alternatives.find({consult_part: consult_part_id, validated: true}).count()
  },
  'alternatives.toggle_like'(alternative_id){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter pour soutenir une alternative")
    }else{
      const alternative = Alternatives.findOne({_id: alternative_id})
      const alternative_like = AlternativeLikes.findOne({user: this.userId, alternative: alternative_id})
      if(!alternative_like){
        console.log("CREATION");

        Meteor.call('alternative_likes.insert', {user: this.userId, alternative: alternative_id})
        alternative.likes++
        Meteor.call('alternatives.update', alternative)
      }else{
        console.log("SUPPRESSION");
        AlternativeLikes.remove({user: this.userId, alternative: alternative_id})
        alternative.likes--
        Meteor.call('alternatives.update', alternative)
      }
    }
  }
})
