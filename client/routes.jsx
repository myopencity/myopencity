import React from 'react'
import { mount } from 'react-mounter'
import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import LandingPage from '../imports/client/general/pages/LandingPage'
import {MainLayout} from './layouts/MainLayout'
import SignupPage from '../imports/client/accounts/pages/SignupPage'

FlowRouter.route('/',{
  name: "Landing",
  action(){
    mount(MainLayout, {
      content: (<LandingPage />)
    })
  }
})

FlowRouter.route('/signup',{
  name: "Signup",
  action(){
    mount(MainLayout, {
      content: (<SignupPage />)
    })
  }
})
