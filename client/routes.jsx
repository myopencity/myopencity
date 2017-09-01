import React from 'react'
import { mount } from 'react-mounter'
import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import LandingPage from '../imports/client/general/pages/LandingPage'
import {MainLayout} from './layouts/MainLayout'
import {BlankLayout} from './layouts/BlankLayout'
import {AdminLayout} from './layouts/AdminLayout'
import SignupPage from '../imports/client/accounts/pages/SignupPage'
import SigninPage from '../imports/client/accounts/pages/SigninPage'
import InitialPresentationPage from '../imports/client/initial_pages/pages/InitialPresentationPage'
import InitialConfigPage from '../imports/client/initial_pages/pages/InitialConfigPage'
import AdminConfigurationPage from '../imports/client/admin/pages/AdminConfigurationPage'
import AdminConsultsPage from '../imports/client/admin/pages/AdminConsultsPage'
import AdminConsultCreationPage from '../imports/client/admin/pages/AdminConsultCreationPage'
import AdminConsultEditPage from '../imports/client/admin/pages/AdminConsultEditPage'
import ConsultsPage from '../imports/client/consults/pages/ConsultsPage'
import ConsultPage from '../imports/client/consults/pages/ConsultPage'
import MyProfile from '../imports/client/accounts/pages/MyProfile'
import ProfilePage from '../imports/client/accounts/pages/ProfilePage'
import ProjectsPage from '/imports/client/projects/pages/ProjectsPage'
import ProjectPage from '/imports/client/projects/pages/ProjectPage'
import NewProjectPage from '/imports/client/projects/pages/NewProjectPage'
import EditProjectPage from '/imports/client/projects/pages/EditProjectPage'
import AdminProjectsPage from '/imports/client/admin/pages/AdminProjectsPage'
import MyProjectsPage from '/imports/client/projects/pages/MyProjectsPage'
import AdminConsultStatsPage from '/imports/client/admin/pages/AdminConsultStatsPage'
import AdminApiAuthorizationsPage from '/imports/client/admin/pages/AdminApiAuthorizationsPage'
import AdminExternalOpencitiesPage from '/imports/client/admin/pages/AdminExternalOpencitiesPage'
import AdminExternalApisPage from '/imports/client/admin/pages/AdminExternalApisPage'
import AdminAlternativesValidationPage from '/imports/client/admin/pages/AdminAlternativesValidationPage'
import AdminUsersPage from '/imports/client/admin/pages/AdminUsersPage'

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

var connectedRoutes = FlowRouter.group({
    name: "connected",
    triggersEnter: [function(context, redirect){
      if(!Meteor.userId()){
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

FlowRouter.route('/signin',{
  name: "Signin",
  action(){
    mount(MainLayout, {
      content: (<SigninPage />)
    })
  }
})

FlowRouter.route('/consults',{
  name: "Consults",
  action(){
    mount(MainLayout, {
      content: (<ConsultsPage />)
    })
  }
})

FlowRouter.route('/consult/:urlShorten',{
  name: "Consult",
  action(params){
    mount(MainLayout, {
      content: (<ConsultPage urlShorten={params.urlShorten}/>)
    })
  }
})

FlowRouter.route('/profile/:user_id',{
  name: "Profile",
  action(params){
    mount(MainLayout, {
      content: (<ProfilePage user_id={params.user_id}/>)
    })
  }
})

FlowRouter.route('/project/:shorten_url',{
  name: "Project",
  action(params){
    mount(MainLayout, {
      content: (<ProjectPage shorten_url={params.shorten_url}/>)
    })
  }
})

FlowRouter.route('/projects',{
  name: "Projects",
  action(){
    mount(MainLayout, {
      content: (<ProjectsPage/>)
    })
  }
})

connectedRoutes.route('/projects/new',{
  name: "NewProject",
  action(){
    mount(MainLayout, {
      content: (<NewProjectPage/>)
    })
  }
})

connectedRoutes.route('/projects/new/:parent_id',{
  name: "NewChildProject",
  action(params){
    mount(MainLayout, {
      content: (<NewProjectPage parent_id={params.parent_id}/>)
    })
  }
})

connectedRoutes.route('/projects/edit/:shorten_url',{
  name: "EditProject",
  action(params){
    mount(MainLayout, {
      content: (<EditProjectPage shorten_url={params.shorten_url}/>)
    })
  }
})

connectedRoutes.route('/me/profile', {
  name: "MyProfile",
  action(){
    mount(MainLayout, {
      content: (<MyProfile />)
    })
  }
})

connectedRoutes.route('/me/projects', {
  name: "MyProjects",
  action(){
    mount(MainLayout, {
      content: (<MyProjectsPage />)
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

adminRoutes.route('/consults/:consult_shorten_url/edit',{
  name: "AdminConsultEdit",
  action(params){
    mount(AdminLayout, {
      content: (<AdminConsultEditPage consult_shorten_url={params.consult_shorten_url} />)
    })
  }
})

adminRoutes.route('/projects',{
  name: "AdminProjects",
  action(){
    mount(AdminLayout, {
      content: (<AdminProjectsPage />)
    })
  }
})

adminRoutes.route('/consult/:shorten_url/stats',{
  name: "AdminConsultStats",
  action(params){
    mount(AdminLayout, {
      content: (<AdminConsultStatsPage shorten_url={params.shorten_url} />)
    })
  }
})

adminRoutes.route('/api_authorizations',{
  name: "AdminApiAuthorizations",
  action(){
    mount(AdminLayout, {
      content: (<AdminApiAuthorizationsPage />)
    })
  }
})

adminRoutes.route('/external_opencities',{
  name: "AdminExternalOpencities",
  action(){
    mount(AdminLayout, {
      content: (<AdminExternalOpencitiesPage />)
    })
  }
})

adminRoutes.route('/external_apis',{
  name: "AdminExternalApis",
  action(){
    mount(AdminLayout, {
      content: (<AdminExternalApisPage />)
    })
  }
})

adminRoutes.route('/alternatives',{
  name: "AdminAlternativesValidation",
  action(){
    mount(AdminLayout, {
      content: (<AdminAlternativesValidationPage />)
    })
  }
})

adminRoutes.route('/users',{
  name: "AdminUsers",
  action(){
    mount(AdminLayout, {
      content: (<AdminUsersPage />)
    })
  }
}) 
