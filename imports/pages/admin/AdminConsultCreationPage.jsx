import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import ConsultForm from '/imports/components/consults/ConsultForm'
import {Grid, Header, Input, Button, Container} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

class AdminConsultCreationPage extends TrackerReact(Component){

  /*
    required props:
      - none
  */

  constructor(props){
    super(props);
    this.state = {
      consult: {}
    }
  }

  go_consults_page(){
    this.props.history.push('/admin/consults')
  }

  render(){
    return(
       <Grid stackable className="wow fadeInLeft">
         <Grid.Column width={16} className="center-align">
           <Header as="h1">Création d'une consultation</Header>
         </Grid.Column>
         <Grid.Column width={16}>
           <Container>
             <ConsultForm onFormSubmit={this.go_consults_page.bind(this)} />
           </Container>
         </Grid.Column>
       </Grid>
    )
  }
}

export default withRouter(AdminConsultCreationPage)
