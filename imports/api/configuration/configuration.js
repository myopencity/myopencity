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
    defaultValue: ""
  },
  landing_main_title_color: {
    type: String,
    defaultValue: "#FFFFFF"
  },
  landing_header_background_url: {
    type: String,
    defaultValue: "http://4vector.com/i/free-vector-modern-city_093317_bluecity.jpg"
  },
  landing_header_description: {
    type: String,
    defaultValue: "Participez activement à la démocratie locale"
  },
  landing_header_description_color: {
    type: String,
    defaultValue: "#FFFFFF"
  },
  consult_header_height: {
    type: String,
    defaultValue: 20
  },
  consult_header_color: {
    type: String,
    defaultValue: "#FFFFFF"
  }
})

Configuration.attachSchema(ConfigurationSchema);
