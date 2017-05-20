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
  results_visible: {
    type: Boolean,
    defaultValue: false
  },
  end_vote_date: {
    type: String,
    optional: true
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
