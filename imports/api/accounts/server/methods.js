import {Meteor} from 'meteor/meteor'
import _ from 'lodash'

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
  },
  'users.toggle_blocked'(user_id){
    if(!Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      if(Roles.userIsInRole(user_id, ['admin'])){
        throw new Meteor.Error('403', "Vous ne pouvez pas bloquer un administrateur")
      }else{
        let user = Meteor.users.findOne({_id: user_id})
        user.blocked = !user.blocked
        Meteor.users.update({_id: user_id}, user)
        if(user.blocked){
          var sessions = _.filter(Meteor.default_server.sessions, function (session) {
              return session.userId == user._id
          })
          _.each(sessions, function (session) {
              session.connectionHandle.close()
          })
        }
      }
    }
  },
  'users.toggle_moderator'(user_id){
    if(!Roles.userIsInRole(this.userId, 'admin')){
      throw new Meteor.Error('403', "Vous devez être administrateur")
    }else{
      if(Roles.userIsInRole(user_id, 'moderator')){
        let user = Meteor.users.findOne({_id: user_id})
        user.roles.splice(user.roles.indexOf('moderator'), 1)
        Meteor.users.update({_id: user_id}, user)
      }else{
        Roles.addUsersToRoles(user_id, 'moderator')
      }
    }
  },
  'users.count'(){
    if(!Roles.userIsInRole(this.userId, ['admin', 'moderator'])){
      throw new Meteor.Error('403', "Vous devez être administrateur ou modérateur")
    }else{
      return Meteor.users.find({_id: {$ne: this.userId}}).count()
    }
  },
  'users.reset_password_email'(email){
    const user = Meteor.users.findOne({'emails.address': email})
    if(user){
      Email.send({
        to: user.emails[0].address,
        from: 'contac@myopencity.io',
        subject: "Recover password",
        text: "UN TEXTE DE TEST"
      })
      // Accounts.sendResetPasswordEmail(user, user.emails[0].address)
    }else{
      throw new Meteor.Error('403', "Aucun compte n'a été trouvé pour cette adresse email")
    }
  } 
})
