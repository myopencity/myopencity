import { Meteor } from 'meteor/meteor'
import _ from 'lodash'
const mailer = require('mailer')
import { ExternalApisConfiguration } from '/imports/api/external_apis_configuration/external_apis_configuration'
import EmailResetPassword from '/imports/components/emails/EmailResetPassword'
import React from "react"
import { renderToString } from "react-dom/server"
import { ServerStyleSheet } from "styled-components"
import { Random } from 'meteor/random'
import { Accounts } from 'meteor/accounts-base'
import { Projects } from '/imports/api/projects/projects'
import { Alternatives } from '/imports/api/alternatives/alternatives'
import { ProjectLikes } from '/imports/api/project_likes/project_likes'
import { ConsultPartVotes } from '/imports/api/consult_part_votes/consult_part_votes'

Meteor.methods({
  'user.signup'({ email, password, username }) {
    Accounts.createUser({
      username: username,
      email: email,
      password: password,
      profile: {
        avatar_url: '/images/avatar-logo.png'
      }
    })
  },
  'user.init_creation'({ email, password, username }) {
    const users = Meteor.users.find().fetch()
    if (!users || users.length == 0) {
      const user = Accounts.createUser({
        username: username,
        email: email,
        password: password,
        profile: {
          avatar_url: '/images/avatar-logo.png'
        }
      })

      Roles.addUsersToRoles(user, 'admin')
    } else {
      throw new Meteor.Error('403', "Initial user account already exists")
    }
  },
  'user.edit_profile'(profile) {
    if (!this.userId) {
      throw new Meteor.Error('403', "Vous devez vous connecter")
    } else {
      Meteor.users.update({ _id: this.userId }, { $set: { profile: profile } })
    }
  },
  'users.toggle_blocked'(user_id) {
    if (!Roles.userIsInRole(this.userId, ['admin', 'moderator'])) {
      throw new Meteor.Error('403', "Vous devez être administrateur")
    } else {
      if (Roles.userIsInRole(user_id, ['admin'])) {
        throw new Meteor.Error('403', "Vous ne pouvez pas bloquer un administrateur")
      } else {
        let user = Meteor.users.findOne({ _id: user_id })
        user.blocked = !user.blocked
        Meteor.users.update({ _id: user_id }, user)
        if (user.blocked) {
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
  'users.toggle_moderator'(user_id) {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('403', "Vous devez être administrateur")
    } else {
      if (Roles.userIsInRole(user_id, 'moderator')) {
        let user = Meteor.users.findOne({ _id: user_id })
        user.roles.splice(user.roles.indexOf('moderator'), 1)
        Meteor.users.update({ _id: user_id }, user)
      } else {
        Roles.addUsersToRoles(user_id, 'moderator')
      }
    }
  },
  'users.count'() {
    if (!Roles.userIsInRole(this.userId, ['admin', 'moderator'])) {
      throw new Meteor.Error('403', "Vous devez être administrateur ou modérateur")
    } else {
      return Meteor.users.find({ _id: { $ne: this.userId } }).count()
    }
  },
  'users.reset_password_email'(email) {
    const user = Meteor.users.findOne({ 'emails.address': email })
    const external_configuration = ExternalApisConfiguration.findOne()
    if (user) {

      // Generate reset password token
      const token = Random.id()
      Meteor.users.update({ _id: user._id }, {
        $set: {
          "services.password.reset": {
            token: token,
            email: email,
            when: new Date()
          }
        }
      })

      const resetPasswordUrl = external_configuration.email_smtp_from_domain + "/reset-password/" + token;
      const sheet = new ServerStyleSheet()

      const html = renderToString(
        sheet.collectStyles(
          <EmailResetPassword username={user.username} url={resetPasswordUrl} />
        )
      )

      try {
        mailer.send({
          host: external_configuration.email_smtp_server,
          port: external_configuration.email_smtp_port,
          domain: external_configuration.email_smtp_from_domain,
          authentication: "login",
          username: external_configuration.email_smtp_username,
          password: external_configuration.email_smtp_password,
          to: user.emails[0].address,
          from: external_configuration.email_smtp_from,
          subject: "Demande de nouveau mot de passe",
          html: html
        })
      } catch (error) {
        console.log("Error during send of email")
      }
      // Accounts.sendResetPasswordEmail(user, user.emails[0].address)
    } else {
      throw new Meteor.Error('403', "Aucun compte n'a été trouvé pour cette adresse email")
    }
  },
  'users.reset_password'({token, password, password_confirmation}) {
    if(password !== password_confirmation){
      throw new Meteor.Error('403', "Le mot de passe et sa confirmation sont différents")
    }else{
      const user = Meteor.users.findOne({"services.password.reset.token": token})
      if(user){
        Accounts.setPassword(user._id, password)
        Meteor.users.update({_id: user._id}, {$set: {
          "services.password.reset": {
            token: null,
            email: null,
            when: null
          }
        }})
      }else{
        throw new Meteor.Error('403', "Aucun utilisateur correspondant")
      }
    }
  },
  'users.profile_stats'(user_id){
    const user = Meteor.users.findOne({_id: user_id})
    if(user){
      const projects = Projects.find({author: user_id}).count()
      const votes = ConsultPartVotes.find({user: user_id}).count()
      const project_likes = ProjectLikes.find({user: user_id}).count()
      const alternatives = Alternatives.find({user: user_id}).count()
      return {projects, votes, project_likes, alternatives}
    }else{
      throw new Meteor.Error('403', "Utilisateur introuvable")
    }
  }
})
