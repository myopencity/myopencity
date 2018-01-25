import { Meteor } from 'meteor/meteor'

Meteor.publish('user.profile', function (user_id) {
  return Meteor.users.find({ _id: user_id }, { fields: { username: 1, profile: 1 } })
})

Meteor.publish('users.search', function ({ page, filter_text, nb_results }) {
  if (Roles.userIsInRole(this.userId, ['admin', 'moderator'])) {
    const limit = nb_results ? nb_results : 50
    return Meteor.users.find({ _id: { $ne: this.userId }, $or: [{ username: { $regex: filter_text, $options: 'i' } }, { 'emails.address': { $regex: filter_text, $options: 'i' } }] }, { skip: limit * page, limit: limit, sort: { 'profile.lastname': 1 } })
  }
})

Meteor.publish('user.me', function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, { fields: { username: 1, profile: 1 } })
  }
})
