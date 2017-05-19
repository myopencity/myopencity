import React from 'react'
import { mount } from 'react-mounter'
import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import LandingPage from '../imports/client/general/pages/LandingPage'
import {MainLayout} from './layouts/MainLayout'
import {BlankLayout} from './layouts/BlankLayout'
import SignupPage from '../imports/client/accounts/pages/SignupPage'
import InitialPresentationPage from '../imports/client/initial_pages/pages/InitialPresentationPage'
import InitialConfigPage from '../imports/client/initial_pages/pages/InitialConfigPage'

FlowRouter.route('/',{
  name: "Landing",
  action(){
    mount(MainLayout, {
      content: (<LandingPage />)
    })
  }
})

FlowRouter.route('/init_presentation', {
  name: "InitialPresentation",
  action(){
    mount(BlankLayout, {
      content: (<InitialPresentationPage />)
    })
  }
})

FlowRouter.route('/init_config', {
  name: "InitialConfiguration",
  action(){
    mount(BlankLayout, {
      content: (<InitialConfigPage />)
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
