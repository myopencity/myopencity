import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Loader, Container} from 'semantic-ui-react'
import {Consults} from '/imports/api/consults/consults'

export class ConsultPage extends TrackerReact(Component){

  /*
    required props:
      - consult
  */

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    const {consult} = this.props
    const {consult_header_height, consult_header_color} = Session.get('global_configuration')

    if(consult){
      return(
        <Grid stackable className="wow fadeInUp">
          <Grid.Column
            width={16}
            className="center-align consult-header"
            style={{
              backgroundImage: "url('" + consult.image_url + "')",
              height: consult_header_height
            }}>
            <Grid verticalAlign="middle" className="consult-header-inner-grid">
              <Grid.Column width={16} className="center-align">
                <Header className="wow fadeInUp" data-wow-delay="1s" as="h1" style={{color: consult_header_color}}>{consult.title}</Header>
              </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column width={16} className="center-align">
            <Container>
              <p>{consult.description}</p>
            </Container>
          </Grid.Column>
        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement de la consultation</Loader>
    }
  }
}

export default ConsultPageContainer = createContainer(({ urlShorten }) => {
  const consultPublication = Meteor.subscribe('consult', urlShorten)
  const loading = !consultPublication.ready()
  const consult = Consults.findOne({url_shorten: urlShorten, visible: true})
  return {
    loading,
    consult
  }
}, ConsultPage)
