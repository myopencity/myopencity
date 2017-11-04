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
              <Admin component={ AdminConfigurationPage }  exact path="/admin/configuration" { ...this.props } />
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
