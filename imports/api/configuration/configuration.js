import {Mongo} from 'meteor/mongo'

export const Configuration = new Mongo.Collection('configuration')

const ConfigurationSchema = new SimpleSchema({
  initial_configuration: {
    type: Boolean,
    defaultValue: true
  },
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
    defaultValue: "Votre espace"
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
  landing_consults_background_color: {
    type: String,
    defaultValue: '#FFFFFF'
  },
  consult_header_height: {
    type: String,
    defaultValue: '20em'
  },
  consult_header_color: {
    type: String,
    defaultValue: "#FFFFFF"
  },
  consult_description_background_color: {
    type: String,
    defaultValue: "#ecf0f1"
  },
  consult_description_color: {
    type: String,
    defaultValue: "#000000"
  },
  consult_description_font_size: {
    type: String,
    defaultValue: "1.2em"
  },
  alternative_like_icon_color: {
    type: String,
    defaultValue: "#3498db"
  },
  alternative_likes_term: {
    type: String,
    defaultValue: "soutiens"
  },
  projects_page_header_title: {
    type: String,
    defaultValue: "Projets proposés"
  },
  project_header_height: {
    type: String,
    defaultValue: '20em'
  },
  project_header_color: {
    type: String,
    defaultValue: "#FFFFFF"
  },
  project_description_background_color: {
    type: String,
    defaultValue: "#ecf0f1"
  },
  project_description_color: {
    type: String,
    defaultValue: "#000000"
  },
  project_description_font_size: {
    type: String,
    defaultValue: "1.2em"
  }
})

Configuration.attachSchema(ConfigurationSchema);
