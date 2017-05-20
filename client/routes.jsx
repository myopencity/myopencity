import React from 'react'
import { mount } from 'react-mounter'
import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import LandingPage from '../imports/client/general/pages/LandingPage'
import {MainLayout} from './layouts/MainLayout'
import {BlankLayout} from './layouts/BlankLayout'
import {AdminLayout} from './layouts/AdminLayout'
import SignupPage from '../imports/client/accounts/pages/SignupPage'
import InitialPresentationPage from '../imports/client/initial_pages/pages/InitialPresentationPage'
import InitialConfigPage from '../imports/client/initial_pages/pages/InitialConfigPage'
import AdminConfigurationPage from '../imports/client/admin/pages/AdminConfigurationPage'
import AdminConsultsPage from '../imports/client/admin/pages/AdminConsultsPage'
import AdminConsultCreationPage from '../imports/client/admin/pages/AdminConsultCreationPage'

FlowRouter.wait()

Tracker.autorun((computation) => {
 if(Roles.subscription.ready() && !FlowRouter._initialiazed ) {
   FlowRouter.initialize();
   computation.stop()
 }
});

var adminRoutes = FlowRouter.group({
    prefix: "/admin",
    name: "admin",
    triggersEnter: [function(context, redirect){
      if(!Meteor.userId()){
        FlowRouter.go('Landing')
      }
      if(!Roles.userIsInRole(Meteor.user(), 'admin')){
        Bert.alert({
          title: "Vous n'êtes pas administrateur",
          message: "Essayez encore ;)",
          type: 'danger',
          style: 'growl-bottom-left',
        })
        FlowRouter.go('Landing')
      }
    }]
});

// ----------- GENERAL ROUTES
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

// ----------- ADMIN ROUTES
adminRoutes.route('/configuration',{
  name: "AdminConfiguration",
  action(){
    mount(AdminLayout, {
      content: (<AdminConfigurationPage />)
    })
  }
})

adminRoutes.route('/consults',{
  name: "AdminConsults",
  action(){
    mount(AdminLayout, {
      content: (<AdminConsultsPage />)
    })
  }
})

adminRoutes.route('/consults/new',{
  name: "AdminConsultCreation",
  action(){
    mount(AdminLayout, {
      content: (<AdminConsultCreationPage />)
    })
  }
})
