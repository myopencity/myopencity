import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Loader, Container} from 'semantic-ui-react'
import {Consults} from '/imports/api/consults/consults'
import {ConsultParts} from '/imports/api/consult_parts/consult_parts'
import ConsultPart from '/imports/client/consult_parts/ui/ConsultPart'

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
    const {consult, consult_parts} = this.props
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
          <Container>
            <Grid.Column width={16} className="center-align">
                <p>{consult.description}</p>
            </Grid.Column>
            <Grid.Column width={16}>
              {consult_parts.map((part, index) => {
                return <ConsultPart consult_part={part} />
              })}
            </Grid.Column>
        </Container>
        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement de la consultation</Loader>
    }
  }
}

export default ConsultPageContainer = createContainer(({ urlShorten }) => {
  const consultPublication = Meteor.subscribe('consult', urlShorten)
  const consultPartsPublication = Meteor.subscribe('consult_parts.by_consult_url_shorten', urlShorten)
  const loading = !consultPublication.ready() || !consultPartsPublication.ready()
  const consult = Consults.findOne({url_shorten: urlShorten, visible: true})
  const consult_parts = ConsultParts.find({consult_url_shorten: urlShorten}).fetch()
  return {
    loading,
    consult,
    consult_parts
  }
}, ConsultPage)
