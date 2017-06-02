import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Header, Form, Button, Input, TextArea, Menu, Segment} from 'semantic-ui-react'
import ConsultPartial from '/imports/client/consults/ui/ConsultPartial'
import ConsultPartForm from '/imports/client/consult_parts/ui/ConsultPartForm'

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
      editing_part: null,
      consult_parts: [],
      display_part_form: false
    }
  }

  componentWillReceiveProps(new_props){
    const {consult, consult_parts} = new_props
    if(consult && consult_parts){
      this.setState({consult, consult_parts})
    }
  }

  componentWillMount(){
    const {consult, consult_parts} = this.props
    if(consult && consult_parts){
      this.setState({consult, consult_parts})
    }
  }

  handleConsultChange(attr, e){
    let {consult} = this.state
    consult[attr] = e.target.value
    this.setState({consult})
  }

  submit_form(e){
    e.preventDefault()
    const {consult, consult_parts} = this.state
    if(this.props.consult){
      Meteor.call('consults.update', {consult, consult_parts} , (error, result) => {
        if(error){
          console.log(error)
          Bert.alert({
            title: "Erreur lors de la modification de la consultation",
            message: error.reason,
            type: 'danger',
            style: 'growl-bottom-left',
          })
        }else{
          if(this.props.onFormSubmit){
            this.props.onFormSubmit(result)
          }
          Bert.alert({
            title: "Consultation modifiée",
            type: 'success',
            style: 'growl-bottom-left',
          })
        }
      });
    }else{
      Meteor.call('consults.insert', {consult, consult_parts}, (error, result) => {
        if(error){
          console.log(error)
          Bert.alert({
            title: "Erreur lors de la création de la consultation",
            message: error.reason,
            type: 'danger',
            style: 'growl-bottom-left',
          })
        }else{
          if(this.props.onFormSubmit){
            this.props.onFormSubmit(result)
          }
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
    this.setState({step})
  }

  create_new_part(new_part){
    let {consult_parts, display_part_form} = this.state
    consult_parts.push(new_part)
    display_part_form = false
    this.setState({consult_parts, display_part_form})
  }

  edit_part(part){
    let {consult_parts} = this.state
    console.log("editing part", part, consult_parts)

  }

  toggleState(attr, e){
    let state = this.state
    state[attr] = !state[attr]
    this.setState(state)
  }

  render(){
    const {consult, editing_part, consult_parts, display_part_form} = this.state

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
                  {consult_parts.map((part, index) => {
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
