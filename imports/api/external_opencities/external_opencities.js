import {Mongo} from 'meteor/mongo'

export const ExternalOpencities = new Mongo.Collection('externalopencities')

const ExternalOpencitySchema = new SimpleSchema({
  name: {
    type: String
  },
  url: {
    type: String
  },
  private_key: {
    type: String
  }
})

ExternalOpencities.attachSchema(ExternalOpencitySchema);
