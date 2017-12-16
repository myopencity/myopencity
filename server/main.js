import { Meteor } from 'meteor/meteor'
import {Configuration} from '/imports/api/configuration/configuration'
import {ExternalApisConfiguration} from '/imports/api/external_apis_configuration/external_apis_configuration'
import "/imports/startup/server"
import '/imports/api/configuration/server/methods'
import '/imports/api/configuration/server/publication'
import '/imports/api/external_apis_configuration/server/methods'
import '/imports/api/external_apis_configuration/server/publication'
import '/imports/api/accounts/server/methods'
import '/imports/api/accounts/server/publication'
import '/imports/api/consults/server/methods'
import '/imports/api/consults/server/publication'
import '/imports/api/consult_parts/server/methods'
import '/imports/api/consult_parts/server/publication'
import '/imports/api/consult_part_votes/server/methods'
import '/imports/api/consult_part_votes/server/publication'
import '/imports/api/alternatives/server/methods'
import '/imports/api/alternatives/server/publication'
import '/imports/api/alternative_likes/server/methods'
import '/imports/api/alternative_likes/server/publication'
import '/imports/api/projects/server/methods'
import '/imports/api/projects/server/publication'
import '/imports/api/project_likes/server/methods'
import '/imports/api/project_likes/server/publication'
import '/imports/api/external_api/server/methods'
import '/imports/api/api_authorizations/server/methods'
import '/imports/api/api_authorizations/server/publication'
import '/imports/api/external_opencities/server/methods'
import '/imports/api/external_opencities/server/publication'

Meteor.startup(() => {

  // Migrations
  Migrations.migrateTo('latest')

  console.log("MAIN JS");


  // Initialization of global configuration singleton
  const configuration = Configuration.findOne({})
  if(!configuration){
    console.log("SERVER : Created global configuration singleton")
    Configuration.insert({})
  }
  const external_configuration = ExternalApisConfiguration.findOne({})
  if(!external_configuration){
    console.log("SERVER : Created external apis configuration singleton")
    ExternalApisConfiguration.insert({})
  }

  // Handle blocked user
  Accounts.validateLoginAttempt(function(attempt) {
    if(attempt.user && attempt.user.blocked) {
      attempt.allowed = false
      throw new Meteor.Error(500, "Votre compte a été désactivé, contactez un administrateur")
    }
    return true
  })

  // Handling external services login
  Accounts.onCreateUser(function (options, user) {

      if (user.services.facebook) {
          user.username = user.services.facebook.name
          user.emails = [{address: user.services.facebook.email}]
          // Handle avatar_url
          user.profile = {
            avatar_url: user.services.facebook.picture ? user.services.facebook.picture : '/images/avatar-logo.png'
          }
          return user
      }else if (user.services.google) {
          user.username = user.services.google.given_name
          user.emails = [{address: user.services.google.email}]
          // Handle avatar_url
          user.profile = {
            avatar_url: user.services.google.picture ? user.services.google.picture : '/images/avatar-logo.png'
          }
          return user
      }else{
        console.log("USER", user);

        user.profile = {
          avatar_url: '/images/avatar-logo.png'
        }
        return user
      }
  })
})
