import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Header, Form, Button, Input, TextArea, Menu} from 'semantic-ui-react'
import ConsultPartial from '/imports/client/consults/ui/ConsultPartial'

export default class ConsultForm extends TrackerReact(Component){

  /*
    facultative props:
      - consult: Object (Consult to enable edit mode)
  */

  constructor(props){
    super(props);
    this.state = {
      consult: {},
      step: 'global', // 'global' / 'design' / 'parts' / 'documents' / 'settings'
    }
  }

  componentWillReceiveProps(new_props){
    if(new_props.consult){
      this.setState({consult: new_props.consult})
    }
  }

  handleConsultChange(attr, e){
    let consult = this.state.consult
    consult[attr] = e.target.value
    this.setState({consult: consult})
  }

  submit_form(e){
    e.preventDefault()
    if(this.props.consult){

    }else{
      Meteor.call('consults.insert', this.state.consult, (error, result) => {
        if(error){
          console.log(error)
          Bert.alert({
            title: "Erreur lors de la création de la consultation",
            message: error.reason,
            type: 'danger',
            style: 'growl-bottom-left',
          })
        }else{
          Bert.alert({
            title: "Consultation créée !",
            type: 'success',
            style: 'growl-bottom-left',
          })
        }
      });
    }
  }

  changeStep(step, e){
    e.preventDefault()
    this.setState({step: step})
  }

  render(){
    const consult = this.state.consult

    return(
      <Grid stackable>
        <Grid.Column width={16} className="center-align">
          <Menu>
            <Menu.Item onClick={(e) => {this.changeStep('global', e)}} active={this.state.step == 'global'}>Informations générales</Menu.Item>
            <Menu.Item onClick={(e) => {this.changeStep('design', e)}} active={this.state.step == 'design'}>Apparence de la consultation</Menu.Item>
            <Menu.Item onClick={(e) => {this.changeStep('parts', e)}} active={this.state.step == 'parts'}>Parties / Contenu</Menu.Item>
            <Menu.Item onClick={(e) => {this.changeStep('documents', e)}} active={this.state.step == 'documents'}>Documents</Menu.Item>
            <Menu.Item onClick={(e) => {this.changeStep('settings', e)}} active={this.state.step == 'settings'}>Configuration</Menu.Item>
            <Menu color="green" floated='right'>
              <Menu.Item>
                <Button positive onClick={(e) => {this.submit_form(e)}}>Valider</Button>
              </Menu.Item>
            </Menu>
          </Menu>
        </Grid.Column>
        <Grid.Column width={16}>
            {this.state.step == 'global' ?
              <Form onSubmit={(e) => {this.changeStep('design', e)}} className="wow fadeInUp">
                <Form.Field>
                  <label>Titre de la consultation</label>
                  <Input type="text" placeholder="ex: Choisissons ensemble les rues à piétoniser dans le centre ville" value={consult.title} onChange={(e) => {this.handleConsultChange('title', e)}} />
                </Form.Field>
                <Form.Field>
                  <label>Description courte de la consultation</label>
                  <TextArea placeholder="Ex: Dans le cadre de la réforme régionale, nous invitons les citoyens à donner leur avis sur..." value={consult.description} onChange={(e) => {this.handleConsultChange('description', e)}} />
                </Form.Field>
                <Form.Field>
                  <Button size="big">Passer à l'apparence</Button>
                </Form.Field>
              </Form>
            : ''}
            {this.state.step == 'design' ?
              <Grid stackable className="wow fadeInUp">
                <Grid.Column width={16}>
                  <Form onSubmit={(e) => {this.changeStep('design', e)}}>
                    <Form.Field>
                      <label>URL de l'image de votre consultation</label>
                      <Input type="text" placeholder="http://...." value={consult.image_url} onChange={(e) => {this.handleConsultChange('image_url', e)}} />
                    </Form.Field>
                    <Form.Field>
                      <Button size="big">Passer au contenu</Button>
                    </Form.Field>
                  </Form>
                </Grid.Column>
                <Grid.Column width={16} className="center-align">
                  <ConsultPartial hideButtons consult={this.state.consult}/>
                  <p>Voilà à quoi ressemble votre consultation</p>
                </Grid.Column>
              </Grid>
            : ''}
        </Grid.Column>
      </Grid>
    )
  }
}
