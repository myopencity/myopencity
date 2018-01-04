import React, { Component } from "react"

//packages
import { Switch, withRouter }           from 'react-router-dom'
import { Helmet }           from "react-helmet"
import { createContainer } from 'meteor/react-meteor-data'
import {Loader, Grid, Sidebar, Button, Menu, Icon} from 'semantic-ui-react'

// Components
import Navbar from '/imports/components/navigation/Navbar'

// routes
import Public from '/imports/components/routes/Public'

// Collection
import {Configuration} from '/imports/api/configuration/configuration'

// Pages
import Landing from '/imports/pages/general/Landing'
import SignupPage from '/imports/pages/accounts/SignupPage'
import SigninPage from '/imports/pages/accounts/SigninPage'
import ConsultsPage from '/imports/pages/consults/ConsultsPage'
import ConsultPage from '/imports/pages/consults/ConsultPage'
import MyProfile from '/imports/pages/accounts/MyProfile'
import ProfilePage from '/imports/pages/accounts/ProfilePage'
import ProjectsPage from '/imports/pages/projects/ProjectsPage'
import ProjectPage from '/imports/pages/projects/ProjectPage'
import NewProjectPage from '/imports/pages/projects/NewProjectPage'
import EditProjectPage from '/imports/pages/projects/EditProjectPage'
import MyProjectsPage from '/imports/pages/projects/MyProjectsPage'
import SendPasswordEmail from '/imports/pages/accounts/SendPasswordEmail'
import ResetPassword from '/imports/pages/accounts/ResetPassword'
import NotFound from '/imports/pages/general/NotFound'
import TrackerReact from 'meteor/ultimatejs:tracker-react'

export class MainLayout extends TrackerReact(Component) {
  constructor(props){
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount(){
    this.setState({ loading: false })
  }

  componentWillReceiveProps(props){
    console.log('this.props', props)
    if(props.global_configuration.initial_configuration){
      props.history.push('/initial/presentation')
    }
  }

  toggleSidebar(e){
    e.preventDefault()
    Session.set('open_sidebar', !Session.get('open_sidebar'))
  }

  go(route, e){
    e.preventDefault()
    this.props.history.push(route)
    Session.set('open_sidebar', false)
  }

  render(){
    const { global_configuration, loading } = this.props

    console.log("CLIENT: MAIN LAYOUT");


    if(!loading){
      Session.set('global_configuration', global_configuration)
      return(
        <div className="main-container">
          <Helmet>
            <title>{global_configuration.website_name}</title>
            <meta name="description" content={global_configuration.website_description} />
            {!global_configuration.seo_active ?
              <meta name="robots" content="noindex"/>
            : ''}
          </Helmet>
          <Sidebar.Pushable>
            <Sidebar as={Menu} animation='push' width='thin' visible={Session.get('open_sidebar')} className="main-sidebar" icon='labeled' vertical inverted>
              <Menu.Item name='consultations' onClick={(e) => {this.go('/', e)}}>
                Accueil
              </Menu.Item>
              <Menu.Item name='consultations' onClick={(e) => {this.go('/consults', e)}}>
                Consultations
              </Menu.Item>
              <Menu.Item name='propositions' onClick={(e) => {this.go('/projects', e)}}>
                Propositions
              </Menu.Item>
              {Meteor.userId() ?
                <span>
                  {Roles.userIsInRole(Meteor.userId(), ['admin', 'moderator']) ?
                    <Menu.Item floated="bottom" name='admin' onClick={(e) => {this.go('/admin/consults', e)}}>
                      Admin
                    </Menu.Item>
                  : ''}
                  <Menu.Item floated="bottom" name='profile' onClick={(e) => {this.go('/me/profile', e)}}>
                    Profil
                  </Menu.Item>
                  <Menu.Item floated="bottom" name='profile' onClick={(e) => {this.logout(e)}}>
                    Déconnexion
                  </Menu.Item>
                </span>
              :
                <Menu.Item name='sign_in' onClick={(e) => {this.go('/sign_in', e)}}>
                  Connexion
                </Menu.Item>
              }
            </Sidebar>
            <Sidebar.Pusher>
              <Grid>
                <Grid.Column width={16} className="navbar-container">
                  <Navbar />
                </Grid.Column>
                <Grid.Column width={16}>
                  <main>
                    <Switch>
                      <Public component={ Landing }  exact path="/" { ...this.props } />
                      <Public component={ SignupPage }  exact path="/sign_up"       { ...this.props } />
                      <Public component={ SigninPage }  exact path="/sign_in"       { ...this.props } />
                      <Public component={ ConsultsPage }  exact path="/consults"       { ...this.props } />
                      <Public component={ ConsultPage }  exact path="/consults/:urlShorten"       { ...this.props } />
                      <Public component={ ProfilePage }  exact path="/profile/:user_id"       { ...this.props } />
                      <Public component={ ProjectsPage }  exact path="/projects"       { ...this.props } />
                      <Public component={ NewProjectPage }  exact path="/projects/new"       { ...this.props } />
                      <Public component={ NewProjectPage }  exact path="/projects/new/:parent_id"       { ...this.props } />
                      <Public component={ EditProjectPage }  exact path="/projects/:shorten_url/edit"       { ...this.props } />
                      <Public component={ ProjectPage }  exact path="/projects/:shorten_url"       { ...this.props } />
                      <Public component={ MyProfile }  exact path="/me/profile"       { ...this.props } />
                      <Public component={ MyProjectsPage }  exact path="/me/projects"       { ...this.props } />
                      <Public component={ SendPasswordEmail }  exact path="/forgot_password" { ...this.props } />
                      <Public component={ ResetPassword }  exact path="/reset-password/:token" { ...this.props } />
                      <Public component={ NotFound } path="*"  { ...this.props } />
                    </Switch>
                  </main>
                </Grid.Column>
              </Grid>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      )
    }else{
      return <Loader className="inline-block">Chargement de la page</Loader>
    }
  }
}

export default MainLayoutContainer = createContainer(() => {
  const globalConfigurationPublication = Meteor.subscribe('global_configuration')
  const loading = !globalConfigurationPublication.ready()
  const global_configuration = Configuration.findOne({})
  console.log('global conf', global_configuration)
  return {
    loading,
    global_configuration
  }
}, withRouter(MainLayout))
