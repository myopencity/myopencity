import {Mongo} from 'meteor/mongo'

export const Projects = new Mongo.Collection('projects')

const ProjectSchema = new SimpleSchema({
  title: {
    type: String
  },
  description: {
    type: String,
    optional: true
  },
  content: {
    type: String
  },
  author: {
    type: String
  },
  anonymous: {
    type: Boolean,
    defaultValue: true
  },
  likes: {
    type: Number,
    defaultValue: 0
  },
  visible: {
    type: Boolean,
    defaultValue: true
  },
  validated: {
    type: Boolean,
    defaultValue: true
  },
  image_url: {
    type: String,
    defaultValue: "https://image.freepik.com/free-vector/business-people-with-speech-bubbles_1325-25.jpg"
  },
  shorten_url: {
    type: String,
    unique: true
  },
  created_at: {
    type: Date,
    defaultValue: new Date()
  },
  updated_at: {
    type: Date,
    defaultValue: new Date()
  }
})

Projects.attachSchema(ProjectSchema);
