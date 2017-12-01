import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Form, Input, Checkbox, Button} from 'semantic-ui-react'

export default class AdminExternalOpencityForm extends TrackerReact(Component){

  /*
    facultative props:
      - external_opencity: Object
      - onFormSubmitted: Function
  */

  constructor(props){
    super(props);
    this.state = {
      external_opencity: {}
    }
  }

  generate_random_api_key(){
    var text = ""
    var possible = "&#-_@ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (var i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text
  }

  componentWillMount(){
    if(this.props.external_opencity){
      this.setState({external_opencity: this.props.external_opencity})
    }
  }

  handleChange(attr, e){
    let {external_opencity} = this.state
    external_opencity[attr] = e.target.value
    this.setState({external_opencity})
  }

  toggleState(attr, e){
    let {external_opencity} = this.state
    external_opencity[attr] = !external_opencity[attr]
    this.setState({external_opencity})
  }

  submit_form(e){
    e.preventDefault()
    if(this.props.external_opencity){
      Meteor.call('external_opencities.update', this.state.external_opencity , (error, result) => {
        if(error){
          console.log(error)
          Bert.alert({
            title: "Erreur lors de la modification de l'autorisation",
            message: error.reason,
            type: 'danger',
            style: 'growl-bottom-left',
          })
        }else{
          Bert.alert({
            title: "Autorisation modifiée",
            type: 'success',
            style: 'growl-bottom-left',
          })
          if(this.props.onFormSubmitted){
            this.props.onFormSubmitted()
          }
        }
      })
    }else{
      Meteor.call('external_opencities.insert', this.state.external_opencity , (error, result) => {
        if(error){
          console.log(error)
          Bert.alert({
            title: "Erreur lors de la création de l'autorisation",
            message: error.reason,
            type: 'danger',
            style: 'growl-bottom-left',
          })
        }else{
          Bert.alert({
            title: "Autorisation créée",
            message: "La clé peut maintenant être utilisée",
            type: 'success',
            style: 'growl-bottom-left',
          })
          if(this.props.onFormSubmitted){
            this.props.onFormSubmitted()
          }
        }
      })
    }
  }

  render(){
    const {external_opencity} = this.state

    return(
      <Form>
        <Form.Field>
          <label>Nom de la clé</label>
          <Input value={external_opencity.name} type="text" onChange={(e) => {this.handleChange('name', e)}} />
        </Form.Field>
        <Form.Field>
          <label>Clé</label>
          <Input value={external_opencity.private_key} type="text" onChange={(e) => {this.handleChange('private_key', e)}} />
        </Form.Field>
        <Form.Field>
          <label>URL</label>
          <Input value={external_opencity.url} type="text" onChange={(e) => {this.handleChange('url', e)}} />
        </Form.Field>
        <Form.Field>
          <Button onClick={(e) => {this.submit_form(e)}} positive>{this.props.external_opencity ? "Modifier" : "Créer"}</Button>
        </Form.Field>
      </Form>
    )
  }
}
