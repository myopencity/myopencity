import {Mongo} from 'meteor/mongo'

export const Configuration = new Mongo.Collection('configuration')

const ConfigurationSchema = new SimpleSchema({
  navbar_color: {
    type: String,
    defaultValue: "#1abc9c"
  },
  main_title: {
    type: String,
    defaultValue: "Ma ville"
  },
  landing_main_title: {
    type: String,
    defaultValue: "Ma ville"
  },
  landing_header_background_url: {
    type: String,
    defaultValue: "http://4vector.com/i/free-vector-modern-city_093317_bluecity.jpg"
  },
  landing_header_description: {
    type: String,
    defaultValue: "Participez activement à la démocratie locale"
  }
})

Configuration.attachSchema(ConfigurationSchema);
