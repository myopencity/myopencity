import {Mongo} from 'meteor/mongo'

export const AlternativeLikes = new Mongo.Collection('alternativelikes')

const AlternativeLikeSchema = new SimpleSchema({
  alternative: {
    type: String
  },
  user: {
    type: String
  },
  created_at:{
    type: Date,
    defaultValue: new Date()
  }
})

AlternativeLikes.attachSchema(AlternativeLikeSchema);
