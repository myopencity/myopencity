import {Mongo} from 'meteor/mongo'

export const Configuration = new Mongo.Collection('configuration')

const ConfigurationSchema = new SimpleSchema({
  navbar_color: {
    type: String,
    defaultValue: "#1abc9c"
  }
})

Configuration.attachSchema(ConfigurationSchema);
