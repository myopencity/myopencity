import {Meteor} from 'meteor/meteor'
import {Consults} from '/imports/api/consults/consults'

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
