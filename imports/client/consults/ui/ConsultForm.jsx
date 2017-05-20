import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Form, Button, Input, TextArea} from 'semantic-ui-react'

export default class ConsultForm extends TrackerReact(Component){

  /*
    facultative props:
      - consult: Object (Consult to enable edit mode)
  */

  constructor(props){
    super(props);
    this.state = {
      consult: {},
      step: 'global', // 'global'
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

  render(){
    const consult = this.state.consult

    return(
       <Form onSubmit={(e) => {this.submit_form(e)}}>
        <Form.Field>
          <label>Titre de la consultation</label>
          <Input type="text" value={consult.title} onChange={(e) => {this.handleConsultChange('title', e)}} />
        </Form.Field>
        <Form.Field>
          <label>Description courte de la consultation</label>
          <TextArea value={consult.description} onChange={(e) => {this.handleConsultChange('description', e)}} />
        </Form.Field>
        <Form.Field>
          <Button>{this.props.consult ? "Modifier la consultation" : "Créer la consultation"}</Button>
        </Form.Field>
       </Form>
    )
  }
}
