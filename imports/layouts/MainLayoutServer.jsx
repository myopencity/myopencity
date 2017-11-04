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
