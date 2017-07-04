import {Mongo} from 'meteor/mongo'

export const ProjectLikes = new Mongo.Collection('projectlikes')

const ProjectLikesSchema = new SimpleSchema({
  project: {
    type: String
  },
  user: {
    type: String
  },
  created_at: {
    type: Date,
    defaultValue: new Date()
  }
})

ProjectLikes.attachSchema(ProjectLikesSchema);
