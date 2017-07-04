import {Mongo} from 'meteor/mongo'

export const Alternatives = new Mongo.Collection('alternatives')

const AlternativeSchema = new SimpleSchema({
    title: {
      type: String
    },
    content: {
      type: String
    },
    anonymous: {
      type: Boolean,
      defaultValue: true
    },
    user: {
      type: String
    },
    consult_part: {
      type: String
    },
    likes: {
      type: Number,
      defaultValue: 0
    },
    validated: {
      type: Boolean,
      defaultValue: true
    },
    created_at: {
      type: Date,
      defaultValue: new Date()
    }
})

Alternatives.attachSchema(AlternativeSchema);
