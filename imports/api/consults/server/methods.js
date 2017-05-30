import {Meteor} from 'meteor/meteor'
import {Consults} from '../consults'
import _ from 'lodash'
import {Random} from 'meteor/random'
import {ConsultParts} from '/imports/api/consult_parts/consult_parts'

const generate_url_shorten = (title) => {
  return _.random(100,9999) + '-' + _.kebabCase(title)
}

Meteor.methods({
  'consults.insert'({consult, parts}){
    if(!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      consult.author = this.userId
      consult.url_shorten = generate_url_shorten(consult.title)
      const new_consult_id = Consults.insert(consult)
      _.each(parts, function(part){
        Meteor.call('consult_parts.insert', {consult_part: part, consult_id: new_consult_id })
      })
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
