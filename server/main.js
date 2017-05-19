import { Meteor } from 'meteor/meteor'
import {Configuration} from '/imports/api/configuration/configuration'
import '/imports/api/configuration/server/methods'
import '/imports/api/configuration/server/publication'
import '/imports/api/accounts/server/methods'
import '/imports/api/accounts/server/publication'

Meteor.startup(() => {
  // Initialization of global configuration singleton
  const configuration = Configuration.findOne({})
  if(!configuration){
    console.log("SERVER : Created global configuration singleton")
    Configuration.insert({})
  }

 
});
