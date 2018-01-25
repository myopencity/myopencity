import {Meteor} from 'meteor/meteor'
import {ConsultPartVotes} from '../consult_part_votes'

Meteor.publish('consult_part_votes.all', function(){
  if(Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
    return ConsultPartVotes.find({})
  }
})

Meteor.publish('consult_part_votes.by_part', function(consult_part_id){
  return ConsultPartVotes.find({consult_part: consult_part_id})
})

Meteor.publish('consult_part_votes.my_vote_by_part', function(consult_part_id){
  return ConsultPartVotes.find({consult_part: consult_part_id, user: this.userId})
})
