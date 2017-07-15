import {Mongo} from 'meteor/mongo'

export const ConsultPartVotes = new Mongo.Collection('consultpartvotes')

const ConsultPartVoteSchema = new SimpleSchema({
  user: {
    type: String
  },
  consult_part: {
    type: String
  },
  consult: {
    type: String
  },
  created_at: {
    type: Date,
    defaultValue: new Date()
  },
  extern_url: {
    type: String,
    optional: true
  }
})

ConsultPartVotes.attachSchema(ConsultPartVoteSchema);
