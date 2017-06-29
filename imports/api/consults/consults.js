import {Mongo} from 'meteor/mongo'

export const Consults = new Mongo.Collection('consults')

const ConsultsSchema = new SimpleSchema({
  title: {
    type: String
  },
  description: {
    type: String,
    optional: true
  },
  author: {
    type: String
  },
  visible: {
    type: Boolean,
    defaultValue: false
  },
  votable: {
    type: Boolean,
    defaultValue: true
  },
  ended: {
    type: Boolean,
    defaultValue: false
  },
  results_visible: {
    type: Boolean,
    defaultValue: false
  },
  end_vote_date: {
    type: String,
    optional: true
  },
  image_url: {
    type: String,
    defaultValue: "https://image.freepik.com/free-vector/business-people-with-speech-bubbles_1325-25.jpg"
  },
  url_shorten: {
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

Consults.attachSchema(ConsultsSchema);
