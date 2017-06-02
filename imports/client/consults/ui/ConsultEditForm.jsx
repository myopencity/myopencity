import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Header, Form, Button, Input, TextArea, Menu, Segment} from 'semantic-ui-react'
import ConsultPartial from '/imports/client/consults/ui/ConsultPartial'
import ConsultPartForm from '/imports/client/consult_parts/ui/ConsultPartForm'

export default class ConsultEditForm extends TrackerReact(Component){

  /*
    required props:
      - consult: Object (Consult to enable edit mode)
  */

  constructor(props){
    super(props);
    this.state = {
      consult: {},
      step: 'global', // 'global' / 'design' / 'parts' / 'documents' / 'settings'
      editing_part: null,
      parts: [],
      display_part_form: false
    }
  }

  componentWillMount(){
    this.setState({consult: this.props.consult})
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
    const {consult, parts} = this.state
    if(this.props.consult){

    }else{
      Meteor.call('consults.insert', {consult, parts}, (error, result) => {
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

  create_new_part(new_part){
    let {parts, display_part_form} = this.state
    parts.push(new_part)
    display_part_form = false
    this.setState({parts, display_part_form})
  }

  edit_part(new_part){
    this.parts.push(new_part)
  }

  toggleState(attr, e){
    let state = this.state
    state[attr] = !state[attr]
    this.setState(state)
  }

  render(){
    const {consult, editing_part, parts, display_part_form} = this.state

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
                  <Form onSubmit={(e) => {this.changeStep('parts', e)}}>
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
            {this.state.step == 'parts' ?
              <Grid stackable className="wow fadeInUp">
                <Grid.Column width={16} className="center-align">
                  <Button positive={!display_part_form} onClick={(e) => {this.toggleState('display_part_form', e)}}>
                    {display_part_form ?
                      "Annuler"
                    :
                      "Ajouter une partie"
                    }
                  </Button>
                </Grid.Column>
                <Grid.Column width={4}>
                  {parts.map((part, index) => {
                    return (
                      <Segment clearing>
                        <Header as="h4" floated='left'>{part.title}</Header>
                        <Button.Group stackable floated='right'>
                          <Button icon='edit'/>
                          <Button icon='remove'/>
                        </Button.Group>
                      </Segment>
                    )
                  })}
                </Grid.Column>
                {display_part_form ?
                  <Grid.Column width={12}>
                    <ConsultPartForm consult_part={editing_part} onCreateSubmit={this.create_new_part.bind(this)} onEditSubmit={this.edit_part.bind(this)} />
                  </Grid.Column>
                : ''}
              </Grid>
            : ''}
        </Grid.Column>
      </Grid>
    )
  }
}
