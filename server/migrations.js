import {Meteor} from 'meteor/meteor'
import {Consults} from '/imports/api/consults/consults'

Migrations.add({
  version: 2,
  name: "MIGRATION 2 : Add blocked attribute to users",
  up() {
    Meteor.users.find({blocked: {$exists: false}}).forEach(user => {
      Meteor.users.update(user._id, {$set: {blocked: false}})
    })
  },
  down() {
    Meteor.users.update({}, {$unset: {blocked: true}}, {multi: true}) 
  }
})

Migrations.add({
  version: 1,
  name: "MIGRATION 1 : Add attached_files attribute to Consults collection",
  up() {
    Consults.find({attached_files: {$exists: false}}).forEach(consult => {
      Consults.update(consult._id, {$set: {attached_files: []}})
    })
  },
  down() {
    Consults.update({}, {$unset: {attached_files: true}}, {multi: true})
  }
})
