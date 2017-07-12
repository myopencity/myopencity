import {ApiAuthorizations} from '/imports/api/api_authorizations/api_authorizations'
import {Consults} from '/imports/api/consults/consults'

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
    if(auth){
      const consults = Consults.find({visible: true}).fetch()
      return {
        consults: consults
      }
    }else{
      return {
        message: "not authorized"
      }
    }
  }
})
