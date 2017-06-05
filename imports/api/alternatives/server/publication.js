import {Meteor} from 'meteor/meteor'
import {Alternatives} from '../alternatives'

Meteor.publish('alternatives.all', function(){
  if(!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
    throw new Meteor.Error('403', "Vous n'êtes pas administrateur")
  }else{
    return Alternatives.find({})
  }
})

Meteor.publish('alternatives.paginated_by_consult_part',function({consult_part_id, page, results_size}){
  const skip_entities = page*results_size
  console.log("SKIP ENTITIES", skip_entities);

    return Alternatives.find({validated: true, consult_part: consult_part_id}, {limit: results_size, skip: skip_entities, sort: {likes: -1}})
})

Meteor.publishComposite('alternatives.user', function(alternative_id){
  return {
    find: function(){
      return Alternatives.find({_id: alternative_id})
    },
    children: [
      {
        find: function(alternative){
          if(alternative.anonymous){
            return null
          }else{
            return Meteor.users.find({_id: alternative.user}, {fields: {username: 1, 'profile.avatar_url': 1}})
          }
        }
      }
    ]
  }
})

Meteor.publish('alternative', function(alternative_id){
  return Alternatives.find({_id: alternative_id, validated: true})
})
