import React, { Component } from 'react'
import { Meteor }           from 'meteor/meteor'

import { Route } from 'react-router-dom'

const Public = ({ loggingIn, authenticated, isMobile, component, ...rest }) => (
  <Route {...rest} render={(props) => React.createElement(component, { ...props, isMobile, loggingIn, authenticated })} />
)

export default Public
