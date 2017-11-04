import React, { Component } from "react"

//packages
import { Switch }           from 'react-router-dom'
import { Helmet }           from "react-helmet"
import { createContainer } from 'meteor/react-meteor-data'
import {Loader} from 'semantic-ui-react'

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
import NotFound from '/imports/pages/general/NotFound'

export class MainLayout extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount(){
    this.setState({ loading: false })
  }

  render(){
    const { global_configuration, loading } = this.props

    console.log("CLIENT: MAIN LAYOUT");


    if(!loading){
      Session.set('global_configuration', global_configuration)
      return(
        <div id="main-layout">

          <Helmet>
            <title>{global_configuration.website_name}</title>
            <meta name="description" content={global_configuration.website_description} />
            {!global_configuration.seo_active ?
              <meta name="robots" content="noindex"/>
            : ''}
          </Helmet>

          <main>
            <Navbar {...this.props}/>
            <Switch>
              <Public component={ Landing }  exact path="/" { ...this.props } />
              <Public component={ SignupPage }  exact path="/sign_up"       { ...this.props } />
              <Public component={ SigninPage }  exact path="/sign_in"       { ...this.props } />
              <Public component={ ConsultsPage }  exact path="/consults"       { ...this.props } />
              <Public component={ ConsultPage }  exact path="/consult/:urlShorten"       { ...this.props } />
              <Public component={ ProfilePage }  exact path="/profile/:user_id"       { ...this.props } />
              <Public component={ ProjectsPage }  exact path="/projects"       { ...this.props } />
              <Public component={ NotFound } path="*"  { ...this.props } />
            </Switch>
          </main>

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
  return {
    loading,
    global_configuration
  }
}, MainLayout)
