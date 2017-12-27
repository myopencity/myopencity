import React, { Component } from "react"

//packages
import { Switch, withRouter } from 'react-router-dom'
import { Helmet } from "react-helmet"
import { createContainer } from 'meteor/react-meteor-data'
import {Dimmer, Loader, Image} from 'semantic-ui-react'

//components
import Public from "/imports/components/routes/Public"

// Collection
import {Configuration} from '/imports/api/configuration/configuration'

//pages
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
          <Dimmer active style={{opacity: '1 !important'}}>
              <Image src={configuration.global_logo_url} inline size="small"/><br/>
              <Loader color="blue"></Loader>
          </Dimmer>
          <Switch>
            <Public component={ Landing }  exact path="/"       { ...this.props } />
            <Public component={ SignupPage }  exact path="/sign_up"       { ...this.props } />
            <Public component={ SigninPage }  exact path="/sign_in"       { ...this.props } />
            <Public component={ ConsultsPage }  exact path="/consults"       { ...this.props } />
            <Public component={ ConsultPage }  exact path="/consults/:urlShorten"       { ...this.props } />
            <Public component={ ProfilePage }  exact path="/profile/:user_id"       { ...this.props } />
            <Public component={ ProjectsPage }  exact path="/projects"       { ...this.props } />
            <Public component={ NewProjectPage }  exact path="/projects/new"       { ...this.props } />
            <Public component={ NewProjectPage }  exact path="/projects/new/:parent_id"       { ...this.props } />
            <Public component={ EditProjectPage }  exact path="/projects/edit/:shorten_url"       { ...this.props } />
            <Public component={ ProjectPage }  exact path="/projects/:shorten_url"       { ...this.props } />
            <Public component={ MyProfile }  exact path="/me/profile"       { ...this.props } />
            <Public component={ MyProjectsPage }  exact path="/me/projects"       { ...this.props } />
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
}, withRouter(MainLayoutServer))
