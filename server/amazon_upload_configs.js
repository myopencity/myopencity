import _ from 'lodash'
import {ExternalApisConfiguration} from '/imports/api/external_apis_configuration/external_apis_configuration'

const external_apis_conf = ExternalApisConfiguration.findOne()

Slingshot.fileRestrictions("ConsultImage", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/jpg"],
  maxSize: null
})
