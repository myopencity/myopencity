import React, {Component} from 'react'
import {Form, Input, Button} from 'semantic-ui-react'

export default class SignupForm extends Component{

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
        Bert.alert({
          title: "Votre compte a bien été créé",
          type: 'success',
          style: 'growl-bottom-left',
        })
      }
    })
  }


  render(){
    const user = this.state.user
    const isValid = user.email && user.password && user.username && user.password == user.confirm_password
    return(
       <Form>
         <Form.Field>
           <label>Nom d'utilisateur</label>
           <Input type="text" onChange={(e) => {this.handleChange('username', e)}} />
         </Form.Field>
         <Form.Field>
           <label>Votre adresse email</label>
           <Input type="email" onChange={(e) => {this.handleChange('email', e)}} />
         </Form.Field>
         <Form.Field>
           <label>Mot de passe</label>
           <Input type="password" onChange={(e) => {this.handleChange('password', e)}} />
         </Form.Field>
         <Form.Field>
           <label>Confirmez votre mot de passe</label>
           <Input type="password" onChange={(e) => {this.handleChange('confirm_password', e)}} />
           {this.state.confirm_password && (this.state.password != this.state.confirm_password) ?
            <p>Le mot de passe et la confirmation ne sont pas identiques</p>
           : ''}
         </Form.Field>
         <Button  disabled={!isValid} onClick={(e) => {this.create_account(e)}}>M'inscrire</Button>
       </Form>
    )
  }
}
