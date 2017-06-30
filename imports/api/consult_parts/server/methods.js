import {Meteor} from 'meteor/meteor'
import {ConsultParts} from '../consult_parts'
import {Consults} from '/imports/api/consults/consults'
import {ConsultPartVotes} from '/imports/api/consult_part_votes/consult_part_votes'

Meteor.methods({
  'consult_parts.insert'({consult_part, consult_id}){
    if(!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      const consult = Consults.findOne({_id: consult_id})
      if(consult){
        consult_part.consult_url_shorten = consult.url_shorten
        consult_part.consult = consult_id
        consult_part.consult_url_shorten = consult.url_shorten
        consult_part.author = this.userId
        ConsultParts.insert(consult_part)
      }
    }
  },
  'consult_parts.update'({consult_part}){
    if(!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      _.each(consult_part.vote_values, (vote_value) => {
        if(!vote_value.counter){
          vote_value.counter = 0
        }
      })
      ConsultParts.update({_id: consult_part._id}, {$set: consult_part})
    }
  },
  'consult_parts.remove'(consult_part_id){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      ConsultParts.remove({_id: consult_part_id})
    }
  },
  'consult_parts.remove_multiple'(consult_parts_ids){
    if(!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      ConsultParts.remove({_id: {$in: consult_parts_ids}}, {multi: true})
    }
  },
  'consult_parts.vote'({consult_part_id, index}){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      const consult_part_vote = ConsultPartVotes.findOne({user: this.userId, consult_part: consult_part_id})
      if(consult_part_vote){
        throw new Meteor.Error('403', "Vous avez déjà voté")
      }else{
        let consult_part = ConsultParts.findOne({_id: consult_part_id})
        consult_part.vote_values[index].counter = consult_part.vote_values[index].counter + 1
        ConsultParts.update({_id: consult_part_id}, {$set: {vote_values: consult_part.vote_values}})
        Meteor.call('consult_part_votes.insert', {consult_part_id: consult_part_id, consult_id: consult_part.consult})
      }
    }
  }
})
