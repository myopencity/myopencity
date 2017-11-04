import React, { Component } from "react"

//packages
import { Switch } from 'react-router-dom'
import { Helmet } from "react-helmet"
import { createContainer } from 'meteor/react-meteor-data'

//components
import Public from "/imports/components/routes/Public"

// Collection
import {Configuration} from '/imports/api/configuration/configuration'

//pages
import Landing from '/imports/pages/general/Landing'
import SignupPage from '/imports/pages/accounts/SignupPage'
import SigninPage from '/imports/pages/accounts/SigninPage'
import InitialPresentationPage from '/imports/pages/initial_pages/InitialPresentationPage'
import InitialConfigPage from '/imports/pages/initial_pages/InitialConfigPage'
import AdminConfigurationPage from '/imports/pages/admin/AdminConfigurationPage'
import AdminConsultsPage from '/imports/pages/admin/AdminConsultsPage'
import AdminConsultCreationPage from '/imports/pages/admin/AdminConsultCreationPage'
import AdminConsultEditPage from '/imports/pages/admin/AdminConsultEditPage'
import ConsultsPage from '/imports/pages/consults/ConsultsPage'
import ConsultPage from '/imports/pages/consults/ConsultPage'
import MyProfile from '/imports/pages/accounts/MyProfile'
import ProfilePage from '/imports/pages/accounts/ProfilePage'
import ProjectsPage from '/imports/pages/projects/ProjectsPage'
import ProjectPage from '/imports/pages/projects/ProjectPage'
import NewProjectPage from '/imports/pages/projects/NewProjectPage'
import EditProjectPage from '/imports/pages/projects/EditProjectPage'
import AdminProjectsPage from '/imports/pages/admin/AdminProjectsPage'
import MyProjectsPage from '/imports/pages/projects/MyProjectsPage'
import AdminConsultStatsPage from '/imports/pages/admin/AdminConsultStatsPage'
import AdminApiAuthorizationsPage from '/imports/pages/admin/AdminApiAuthorizationsPage'
import AdminExternalOpencitiesPage from '/imports/pages/admin/AdminExternalOpencitiesPage'
import AdminExternalApisPage from '/imports/pages/admin/AdminExternalApisPage'
import AdminAlternativesValidationPage from '/imports/pages/admin/AdminAlternativesValidationPage'
import AdminUsersPage from '/imports/pages/admin/AdminUsersPage'
import NotFound from '/imports/pages/general/NotFound'

export class MainLayoutServer extends Component {
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
    const { loading } = this.state
    const {configuration} = this.props

    return(
      <div id="main-layout">
        <main>
          <Switch>
            <Public component={ Landing }  exact path="/"       { ...this.props } />
            <Public component={ NotFound } path="*"  { ...this.props } />
          </Switch>
        </main>
      </div>
    )
  }
}

export default MainLayoutServerContainer = createContainer(() => {
  const configuration = Configuration.findOne({})
  return {
    configuration
  }
}, MainLayoutServer)
