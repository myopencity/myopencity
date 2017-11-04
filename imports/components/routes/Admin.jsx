import React, { Component } from 'react'
import { Meteor }           from 'meteor/meteor'
import { Bert } from 'meteor/themeteorchef:bert'

import { Route, Redirect } from 'react-router-dom'

const Admin = ({ loggingIn, authenticated, isMobile, component, isAdmin, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (loggingIn || Meteor.isServer){
      return <div></div>
    }else{
      return Roles.userIsInRole(Meteor.userId(), ['admin','moderator']) ?
        (React.createElement(component, { ...props, loggingIn, authenticated }))
        :
        <Redirect to="/sign_in" />
    }
  }} />
)

export default Admin
