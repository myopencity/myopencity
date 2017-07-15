import {ApiAuthorizations} from '/imports/api/api_authorizations/api_authorizations'
import {Consults} from '/imports/api/consults/consults'
import {ConsultParts} from '/imports/api/consult_parts/consult_parts'
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
  }
})
