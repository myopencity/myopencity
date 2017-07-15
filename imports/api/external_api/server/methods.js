import {ApiAuthorizations} from '/imports/api/api_authorizations/api_authorizations'
import {Consults} from '/imports/api/consults/consults'
import {ConsultParts} from '/imports/api/consult_parts/consult_parts'
import {ConsultPartVotes} from '/imports/api/consult_part_votes/consult_part_votes'
import { HTTP } from 'meteor/http'
import {ExternalOpencities} from '/imports/api/external_opencities/external_opencities'
import _ from 'lodash'

// API Endpoints
const Api = new Restivus({
  useDefaultAuth: true,
  prettyJson: true
})

const is_authorized = (private_key) => {
  return ApiAuthorizations.findOne({private_key})
}


Api.addRoute('consults', {authRequired: false}, {
  post: function(){
    const {private_key, count} = this.bodyParams
    const auth = is_authorized(private_key)
    if(auth && auth.can_get_consults){
      const consults = Consults.find({ended: false, visible: true, external_id: {$exists: false}}).fetch()
      const consults_ids = consults.map((consult) => {return consult._id})
      const consult_parts = ConsultParts.find({consult: {$in: consults_ids}}).fetch()
      return {
        consults: consults,
        consult_parts: consult_parts
      }
    }else{
      return {
        status: "error",
        message: "not authorized"
      }
    }
  }
})

Api.addRoute('consult_part_votes/new', {authRequired: false}, {
  post: function(){
    const {private_key, consult_part_id, vote_value, user_id} = this.bodyParams
    const auth = is_authorized(private_key)
    if(auth && auth.can_post_votes){
      const consult_part = ConsultParts.findOne({_id: consult_part_id, external_url: {$exists: false}})
      if(consult_part){
        // Check existing remote vote
        const consult_part_vote = ConsultPartVotes.findOne({consult_part: consult_part_id, user: user_id})
        if(consult_part_vote){
          return {
            status: "error",
            message: "cannot vote multiple times on same consult part"
          }
        }else{
          console.log("vote_value", vote_value)
          console.log("CONSULT VOTE VALUES", consult_part.vote_values);


          const vote_value_index = _.findIndex(consult_part.vote_values, (o) => {return o.vote_value == vote_value})
          console.log("vote_value_index", vote_value_index);

          if(vote_value_index > -1){
            consult_part.vote_values[vote_value_index].counter++

            ConsultParts.update({_id: consult_part_id}, {$set: {vote_values: consult_part.vote_values}})
            let new_consult_part_vote = {
              user: user_id,
              consult_part: consult_part_id,
              consult: consult_part.consult,
              extern_url: auth.url
            }
            ConsultPartVotes.insert(new_consult_part_vote)
            return {
              status: "success",
              message: "the vote has been added on remote opencity"
            }
          }else{
            return {
              status: "error",
              message: "the vote value is not on remote consult anymore"
            }
          }
        }
      }else{
        return {
          status: "error",
          message: "consult part not found on remote opencity"
        }
      }
    }else{
      return {
        status: "error",
        message: "not authorized"
      }
    }
  }
})

// External API calls
Meteor.methods({
  'api_call.get_external_consults'(){
    const external_opencities = ExternalOpencities.find({}).fetch()

    _.each(external_opencities, (extern_opencity, index) => {
      console.log("----------extern key", extern_opencity.private_key);

      const kept_consults = []
      const result = HTTP.post(extern_opencity.url + '/api/consults', {data: {
        private_key: extern_opencity.private_key
      }}, (error, result) => {
        // const json_result = JSON.parse(result)
        const consults = JSON.parse(result.content).consults
        const consult_parts = JSON.parse(result.content).consult_parts

        _.each(consults, (consult) => {
          console.log("CONSULT TITLE", consult.title);
          let new_consult = {}
          const {_id, title, description, created_at, updated_at, end_vote_date, image_url, url_shorten} = consult
          new_consult = {
            title, description, created_at, updated_at, end_vote_date, image_url, url_shorten,
            external_id: _id,
            external_url: extern_opencity.url + "/consult/" + url_shorten,
            external_site_name: extern_opencity.name,
            author: this.userId
          }
          console.log("NEW CONSULT", new_consult);
          const new_consult_id = Consults.insert(new_consult)
          const linked_parts = _.filter(consult_parts, function(o){return o.consult == consult._id})

          _.each(linked_parts, (part) => {
            console.log("LINKED PART", part);
            part.external_id = part._id
            part.external_url = extern_opencity.url
            delete part._id
            part.consult = new_consult_id

            ConsultParts.insert(part)
          })
        })

      })
    })
  },
  'api_call.new_consult_part_vote'({external_id, external_url, vote_value, user_id}){
    const extern_opencity = ExternalOpencities.findOne({url: external_url})
      const result = HTTP.post(extern_opencity.url + '/api/consult_part_votes/new', {data: {
        private_key: extern_opencity.private_key,
        consult_part_id: external_id,
        vote_value: vote_value,
        user_id: user_id
      }}, (error, result) => {
        if(error){
          console.log("Error calling the external vote API for " + external_url + " : ", error);
        }else{
          console.log("External vote sent successfully to ", external_url);

        }
      })
  }
})
