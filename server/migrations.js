import {Meteor} from 'meteor/meteor'
import {Consults} from '/imports/api/consults/consults'
import {Configuration} from '/imports/api/configuration/configuration'

Migrations.add({
  version: 4,
  name: "MIGRATION 4 : Add logo and global image customization",
  up() {
    Configuration.find({global_image_url: {$exists: false}, global_logo_url: {$exists: false}}).forEach(configuration => {
      Configuration.update(configuration._id, {$set: {global_image_url: "/images/myopencity-logo.png", global_logo_url: "/images/myopencity-favicon.png"}})
    })
  },
  down() {
    Configuration.update({}, {$unset: {global_image_url: true, global_logo_url: true}}, {multi: true})
  }
})

Migrations.add({
  version: 3,
  name: "MIGRATION 3 : Add configuration anonymous fields",
  up() {
    Configuration.find({alternatives_anonymous_choice: {$exists: false}}).forEach(configuration => {
      Configuration.update(configuration._id, {$set: {
        projects_anonymous_choice: true,
        projects_anonymous_default: false,
        alternatives_anonymous_choice: true,
        alternatives_anonymous_default: false
      }})
    }) 
  },
  down() {
    Configuration.update({}, {$unset: {
      projects_anonymous_choice: true,
      projects_anonymous_default: true,
      alternatives_anonymous_choice: true,
      alternatives_anonymous_default: true
    }}, {multi: true})
  }
})

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
