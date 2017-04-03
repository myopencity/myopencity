import React from 'react'
import { mount } from 'react-mounter'
import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import LandingPage from '../imports/client/general/pages/LandingPage.jsx'
import {MainLayout} from './layouts/MainLayout'


FlowRouter.route('/',{
  name: "Landing",
  action(){
    mount(MainLayout, {
      content: (<LandingPage />)
    })
  }
});
