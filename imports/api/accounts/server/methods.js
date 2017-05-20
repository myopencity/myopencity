import {Meteor} from 'meteor/meteor'

Meteor.methods({
  'user.signup'({email, password, username}){
    Accounts.createUser({
      username: username,
      email: email,
      password: password})
  },
  'user.init_creation'({email, password, username}){
    const users = Meteor.users.find().fetch()
    if(!users || users.length == 0){
      const user = Accounts.createUser({
        username: username,
        email: email,
        password: password})

        Roles.addUsersToRoles(user, 'admin')
    }else{
      throw new Meteor.Error('403', "Initial user account already exists")
    }
  }
})
