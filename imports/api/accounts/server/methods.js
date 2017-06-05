import {Meteor} from 'meteor/meteor'

Meteor.methods({
  'user.signup'({email, password, username}){
    Accounts.createUser({
      username: username,
      email: email,
      password: password,
      profile: {
        avatar_url: '/images/avatar-logo.png'
      }})
  },
  'user.init_creation'({email, password, username}){
    const users = Meteor.users.find().fetch()
    if(!users || users.length == 0){
      const user = Accounts.createUser({
        username: username,
        email: email,
        password: password,
        profile: {
          avatar_url: '/images/avatar-logo.png'
        }
      })

        Roles.addUsersToRoles(user, 'admin')
    }else{
      throw new Meteor.Error('403', "Initial user account already exists")
    }
  },
  'user.edit_profile'(profile){
    if(!this.userId){
      throw new Meteor.Error('403', "Vous devez vous connecter")
    }else{
      Meteor.users.update({_id: this.userId}, {$set: {profile: profile}})
    }
  }
})
