import React, { Component } from "react"

//packages
import { Switch }           from 'react-router-dom'
import { Helmet }           from "react-helmet"
import { createContainer } from 'meteor/react-meteor-data'
import {Loader, Sidebar, Menu, Button, Grid, Icon} from 'semantic-ui-react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'

// Components
import Navbar from '/imports/components/navigation/Navbar'

// routes
import Public from '/imports/components/routes/Public'
import Admin from '/imports/components/routes/Admin'

// Collection
import {Configuration} from '/imports/api/configuration/configuration'

// Pages
import AdminConfigurationPage from '/imports/pages/admin/AdminConfigurationPage'
import AdminConsultsPage from '/imports/pages/admin/AdminConsultsPage'
import AdminConsultCreationPage from '/imports/pages/admin/AdminConsultCreationPage'
import AdminConsultEditPage from '/imports/pages/admin/AdminConsultEditPage'
import AdminProjectsPage from '/imports/pages/admin/AdminProjectsPage'
import AdminConsultStatsPage from '/imports/pages/admin/AdminConsultStatsPage'
import AdminApiAuthorizationsPage from '/imports/pages/admin/AdminApiAuthorizationsPage'
import AdminExternalOpencitiesPage from '/imports/pages/admin/AdminExternalOpencitiesPage'
import AdminExternalApisPage from '/imports/pages/admin/AdminExternalApisPage'
import AdminAlternativesValidationPage from '/imports/pages/admin/AdminAlternativesValidationPage'
import AdminUsersPage from '/imports/pages/admin/AdminUsersPage'
import NotFound from '/imports/pages/general/NotFound'

export class AdminLayout extends TrackerReact(Component) {
  constructor(props){
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount(){
    this.setState({ loading: false })
  }

  toggleSidebar(e){
    e.preventDefault()
    Session.set('open_sidebar', !Session.get('open_sidebar'))
  }

  render(){
    const { global_configuration, loading } = this.props

    console.log("CLIENT: MAIN LAYOUT");


    if(!loading){
      Session.set('global_configuration', global_configuration)
      return(
        <div className="main-container">
          <Helmet>
            <title>Myopencity - Administration</title>
            <meta name="robots" content="noindex"/>
          </Helmet>
          <Sidebar.Pushable>
            <Sidebar as={Menu} animation='push' width='thin' visible={Session.get('open_sidebar')} className="main-sidebar" icon='labeled' vertical inverted>
              {Roles.userIsInRole(Meteor.userId(), 'admin') ?
                <Menu.Item onClick={() => {this.go('AdminConfiguration')}} name='cogs'>
                  <Icon name='cogs' />
                  Configuration
                </Menu.Item>
              : ''}
              <Menu.Item onClick={() => {this.go('AdminUsers')}} name='users'>
                <Icon name='users' />
                Utilisateurs
              </Menu.Item>
              {Roles.userIsInRole(Meteor.userId(), 'admin') ?
                <Menu.Item onClick={() => {this.go('AdminExternalApis')}} name='google'>
                  <Icon name='google' />
                  Services externes
                </Menu.Item>
              : ''}
              <Menu.Item onClick={() => {this.go('AdminConsults')}} name='comments'>
                <Icon name='comments' />
                Consultations
              </Menu.Item>
              <Menu.Item onClick={() => {this.go('AdminProjects')}} name='projects'>
                <Icon name='lightbulb' />
                Projets
              </Menu.Item>
              <Menu.Item onClick={() => {this.go('AdminAlternativesValidation')}} name='projects'>
                <Icon name='check circle' />
                Alternatives
              </Menu.Item>
              {Roles.userIsInRole(Meteor.userId(), 'admin') ?
                <Menu.Item onClick={() => {this.go('AdminApiAuthorizations')}} name='api_authorizations'>
                  <Icon name='key' />
                  Autorisations API
                </Menu.Item>
              : ''}
              {Roles.userIsInRole(Meteor.userId(), 'admin') ?
                <Menu.Item onClick={() => {this.go('AdminExternalOpencities')}} name='external_opencities'>
                  <Icon name='exchange' />
                  Opencities connectés
                </Menu.Item>
              : ''}
            </Sidebar>
            <Sidebar.Pusher>
              <Grid stackable>
                <Grid.Column width={16} className="navbar-container">
                  <Navbar />
                </Grid.Column>
                <Grid.Column width={16}>
                  <main>
                    <Switch>
                      <Admin component={ AdminConfigurationPage }  exact path="/admin/configuration" { ...this.props } />
                      <Admin component={ AdminConsultsPage }  exact path="/admin/consults" { ...this.props } />
                      <Admin component={ AdminConsultCreationPage }  exact path="/admin/consults/new" { ...this.props } />
                      <Admin component={ AdminConsultEditPage }  exact path="/admin/consults/:consult_shorten_url/edit" { ...this.props } />
                      <Public component={ NotFound } path="*"  { ...this.props } />
                    </Switch>
                  </main>
                </Grid.Column>
              </Grid>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          <Button style={{backgroundColor: global_configuration.navbar_color, color: global_configuration.navbar_color}} onClick={(e) => {this.toggleSidebar(e)}} className="open-sidebar-button" rounded icon="content" size="big"></Button>
        </div>
      )
    }else{
      return <Loader className="inline-block">Chargement de la page</Loader>
    }
  }
}

export default AdminLayoutContainer = createContainer(() => {
  const globalConfigurationPublication = Meteor.subscribe('global_configuration')
  const loading = !globalConfigurationPublication.ready()
  const global_configuration = Configuration.findOne({})
  return {
    loading,
    global_configuration
  }
}, AdminLayout)
