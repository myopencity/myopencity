import React, {Component} from 'react'
import {Form, Input, Button} from 'semantic-ui-react'

export default class SigninForm extends Component{

  /*
    required props:
      - none
    facultative props:
      - onSignin: Function
  */

  constructor(props){
    super(props)
    this.state = {}
  }

  handleChange(attr, e){
    let state = this.state
    state[attr] = e.target.value
    this.setState(state)
  }

  signin(e){
    e.preventDefault()
    Meteor.loginWithPassword(this.state.email, this.state.password, (error, result) => {
      if(error){
        console.log("Signin error", error)
        Bert.alert({
          title: "Erreur lors de la connexion",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        Bert.alert({
          title: "Vous êtes connecté",
          type: 'success',
          style: 'growl-bottom-left',
        })
        if(this.props.onSignin){
          this.props.onSignin(result)
        }
      }
    })
  }

  render(){
    return(
       <Form>
         <Form.Field>
           <label>Email</label>
           <Input type="email" onChange={(e) => {this.handleChange('email', e)}} />
         </Form.Field>
         <Form.Field>
           <label>Mot de passe</label>
           <Input type="password" onChange={(e) => {this.handleChange('password', e)}} />
         </Form.Field>
         <Button positive onClick={(e) => {this.signin(e)}}>Se connecter</Button>
       </Form>
    )
  }
}
