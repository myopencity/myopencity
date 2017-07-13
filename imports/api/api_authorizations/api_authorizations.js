import {Mongo} from 'meteor/mongo'

export const ApiAuthorizations = new Mongo.Collection('apiauthorizations')

const ApiAuthorizationsSchema = new SimpleSchema({
  name: {
    type: String,
    unique: true
  },
  private_key: {
    type: String
  },
  url: {
    type: String
  },
  can_get_consults: {
    type: Boolean,
    defaultValue: true
  },
  can_post_votes: {
    type: Boolean,
    defaultValue: true
  }
})

ApiAuthorizations.attachSchema(ApiAuthorizationsSchema);
