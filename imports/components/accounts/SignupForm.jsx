import React, {Component} from 'react'
import {Form, Input, Button, Divider} from 'semantic-ui-react'
import {Meteor} from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import {Configuration} from '/imports/api/configuration/configuration'

export class SignupForm extends Component{

  /*
    required params:
  */

  constructor(props){
    super(props);
    this.state = {
      user: {}
    }
  }

  handleChange(attr, e){
    let user = this.state.user
    user[attr] = e.target.value
    this.setState({user: user})
  }

  create_account(e){
    e.preventDefault()
    const that = this
    Meteor.call('user.signup', this.state.user, (error, result) => {
      if(error){
        console.log("signup error", error)
        Bert.alert({
          title: "Erreur lors de l'inscription",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        const {email, password} = that.state.user
        Meteor.loginWithPassword(email, password)
        const return_route = Session.get('return_route')
        if(return_route){
          FlowRouter.go(return_route)
        }else{
          FlowRouter.go('Consults')
        }
        Bert.alert({
          title: "Votre compte a bien été créé",
          type: 'success',
          style: 'growl-bottom-left',
        })
      }
    })
  }

  connect_facebook(e){
    e.preventDefault()
    Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, (error) => {
      if(error){
        console.log("Error during facebook login", error)
      }else{
        const return_route = Session.get('return_route')
        if(return_route){
          FlowRouter.go(return_route)
        }else{
          FlowRouter.go('Consults')
        }
      }
    })
  }

  connect_google(e){
    e.preventDefault()
    Meteor.loginWithGoogle({}, (error) => {
      if(error){
        console.log("Error during google login", error)
      }else{
        const return_route = Session.get('return_route')
        if(return_route){
          FlowRouter.go(return_route)
        }else{
          FlowRouter.go('Consults')
        }
      }
    })
  }


  render(){
    const {user} = this.state
    const {global_configuration, loading} = this.props
    const {facebook_connected, google_connected} = global_configuration
    const isValid = user.email && user.password && user.username && user.password == user.confirm_password

    if(!loading){
      return(
        <Form>
          <Form.Field>
            <label>Nom d'utilisateur</label>
            <Input fluid type="text" onChange={(e) => {this.handleChange('username', e)}} />
          </Form.Field>
          <Form.Field>
            <label>Votre adresse email</label>
            <Input fluid type="email" onChange={(e) => {this.handleChange('email', e)}} />
          </Form.Field>
          <Form.Field>
            <label>Mot de passe</label>
            <Input fluid type="password" onChange={(e) => {this.handleChange('password', e)}} />
          </Form.Field>
          <Form.Field>
            <label>Confirmez votre mot de passe</label>
            <Input fluid type="password" onChange={(e) => {this.handleChange('confirm_password', e)}} />
            {this.state.confirm_password && (this.state.password != this.state.confirm_password) ?
              <p>Le mot de passe et la confirmation ne sont pas identiques</p>
            : ''}
          </Form.Field>
          <Button  disabled={!isValid} onClick={(e) => {this.create_account(e)}}>M'inscrire</Button>
          {facebook_connected || google_connected ?
            <Divider horizontal>OU</Divider>
          : ''}
          {facebook_connected ?
            <Button color="blue" icon="facebook" content="Se connecter avec Facebook" onClick={(e) => {this.connect_facebook(e)}}/>
          : ''}
          {google_connected ?
            <Button color="red" icon="google" content="Se connecter avec Google" onClick={(e) => {this.connect_google(e)}}/>
          : ''}
        </Form>
      )
    }else{
      return <div></div>
    }
  }
}

export default SignupFormContainer = createContainer(() => {
  const globalConfigurationPublication = Meteor.isClient && Meteor.subscribe('global_configuration')
  const loading = Meteor.isClient && !globalConfigurationPublication.ready()
  const global_configuration = Configuration.findOne({})
  return {
    loading,
    global_configuration
  }
}, SignupForm)
