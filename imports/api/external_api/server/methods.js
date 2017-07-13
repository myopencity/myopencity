import {ApiAuthorizations} from '/imports/api/api_authorizations/api_authorizations'
import {Consults} from '/imports/api/consults/consults'
import { HTTP } from 'meteor/http'
import {ExternalOpencities} from '/imports/api/external_opencities/external_opencities'

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
      const consults = Consults.find({ended: false, visible: true}).fetch()
      return {
        consults: consults
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
  'api_call.get_consults'(external_opencity_id){

    const result = HTTP.post('http://localhost:3000/api/consults', {data: {
      private_key: "Ptnu3hybMV2WHfZnULVs"
    }}, (error, result) => {
      console.log("result", result);

    })
  }
})
