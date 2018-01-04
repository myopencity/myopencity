import React, { Component } from "react"

//packages
import { Switch }           from 'react-router-dom'
import { Helmet }           from "react-helmet"
import { createContainer } from 'meteor/react-meteor-data'
import {Loader} from 'semantic-ui-react'

// routes
import Public from '/imports/components/routes/Public'
import Admin from '/imports/components/routes/Admin'

// Collection
import {Configuration} from '/imports/api/configuration/configuration'

// Pages
import InitialPresentationPage from '/imports/pages/initial_pages/InitialPresentationPage'
import InitialConfigPage from '/imports/pages/initial_pages/InitialConfigPage'
import AdminConsultsSummaryPage from '/imports/pages/admin/AdminConsultsSummaryPage'
import NotFound from '/imports/pages/general/NotFound'

export class BlankLayout extends Component {
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


    if(!loading){
      return(
        <div id="main-layout">

          <Helmet>
            <title>Myopencity - Lancement de votre Opencity</title>
            <meta name="description" content={global_configuration.website_description} />
            <meta name="robots" content="noindex"/>
          </Helmet>

          <main>
            <Switch>
              <Admin component={ AdminConsultsSummaryPage }  exact path="/admin/consults_summary" { ...this.props } />
              <Public component={ InitialPresentationPage }  exact path="/initial/presentation" { ...this.props } />
              <Public component={ InitialConfigPage }  exact path="/initial/config" { ...this.props } />
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

export default BlankLayoutContainer = createContainer(() => {
  const globalConfigurationPublication = Meteor.subscribe('global_configuration')
  const loading = !globalConfigurationPublication.ready()
  const global_configuration = Configuration.findOne({})
  return {
    loading,
    global_configuration
  }
}, BlankLayout)
