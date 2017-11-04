import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Form, Input, Checkbox, Button} from 'semantic-ui-react'

export default class AdminApiAuthorizationForm extends TrackerReact(Component){

  /*
    facultative props:
      - authorization: Object
      - onFormSubmitted: Function
  */

  constructor(props){
    super(props);
    this.state = {
      authorization: {}
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
    console.log("pokpzkefpkzepf");

    if(this.props.authorization){
      console.log("auto received");

      this.setState({authorization: this.props.authorization})
    }else{
      console.log("key generation");

      const authorization = {
        private_key: this.generate_random_api_key()
      }
      console.log("autorization generated", authorization);

      this.setState({authorization: authorization})
    }
  }

  handleChange(attr, e){
    let {authorization} = this.state
    authorization[attr] = e.target.value
    this.setState({authorization})
  }

  toggleState(attr, e){
    let {authorization} = this.state
    authorization[attr] = !authorization[attr]
    this.setState({authorization})
  }

  submit_form(e){
    e.preventDefault()
    if(this.props.authorization){
      Meteor.call('api_authorizations.update', this.state.authorization , (error, result) => {
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
      Meteor.call('api_authorizations.insert', this.state.authorization , (error, result) => {
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
    const {authorization} = this.state

    return(
      <Form>
        <Form.Field>
          <label>Nom de la clé</label>
          <Input value={authorization.name} type="text" onChange={(e) => {this.handleChange('name', e)}} />
        </Form.Field>
        <Form.Field>
          <label>Clé</label>
          <Input disabled={true} value={authorization.private_key} type="text" onChange={(e) => {this.handleChange('private_key', e)}} />
        </Form.Field>
        <Form.Field>
          <label>URL</label>
          <Input value={authorization.url} type="text" onChange={(e) => {this.handleChange('url', e)}} />
        </Form.Field>
        <Form.Field>
          <label>Peut récupérer des consultations</label>
          <Checkbox checked={authorization.can_get_consults} onClick={(e) => {this.toggleState('can_get_consults', e)}} toggle />
        </Form.Field>
        <Form.Field>
          <label>Peut apporter des votes</label>
          <Checkbox checked={authorization.can_post_votes} onClick={(e) => {this.toggleState('can_post_votes', e)}} toggle />
        </Form.Field>
        <Form.Field>
          <Button onClick={(e) => {this.submit_form(e)}} positive>{this.props.authorization ? "Modifier" : "Créer"}</Button>
        </Form.Field>
      </Form>
    )
  }
}
