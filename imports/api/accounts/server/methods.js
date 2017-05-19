import {Meteor} from 'meteor/meteor'

Meteor.methods({
  'user.signup'({email, password, username}){
    Accounts.createUser({
      username: username,
      email: email,
      password: password})
  }
})
