import {Meteor} from 'meteor/meteor'
import {ConsultPartVotes} from '../consult_part_votes'

Meteor.methods({
  'consult_part_votes.insert'({consult_part_id, consult_id}){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      const vote = ConsultPartVotes.findOne({user: this.userId, consult_part: consult_part_id, consult: consult_id})
      if(vote){
        throw new Meteor.Error('403', "Vous avez déjà voté")
      }else{
        const new_vote = {user: this.userId, consult_part: consult_part_id, consult: consult_id}
        ConsultPartVotes.insert(new_vote)
      }
    }
  },
  'consult_part_votes.update'(consult_part_vote){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      ConsultPartVotes.update({_id: consult_part_vote._id}, {$set: consult_part_vote})
    }
  },
  'consult_part_votes.remove'(consult_part_vote_id){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      ConsultPartVotes.remove({_id: consult_part_vote_id})
    }
  }
})
