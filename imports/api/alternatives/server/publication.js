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
    return Alternatives.find({validated: true, consult_part: consult_part_id}, {limit: results_size, skip: page*results_size})
})
