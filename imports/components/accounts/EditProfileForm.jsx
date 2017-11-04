import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Form, Input, Button} from 'semantic-ui-react'
import TinyMCE from 'react-tinymce'

export default class EditProfileForm extends TrackerReact(Component){

  /*
    required props:
      - none
  */

  constructor(props){
    super(props);
    this.state = {
      user_profile: {}
    }
  }

  componentWillMount(){
    this.setState({user_profile: Meteor.user().profile})
  }

  handleDescriptionChange(e){
    let {user_profile} = this.state
    user_profile.description = e.target.getContent()
    this.setState({user_profile})
  }

  handleProfileChange(attr, e){
    let {user_profile} = this.state
    user_profile[attr] = e.target.value
    this.setState({user_profile})
  }

  edit_profile(e){
    e.preventDefault()
    const {user_profile} = this.state

    Meteor.call('user.edit_profile', user_profile , (error, result) => {
      if(error){
        console.log(error)
        Bert.alert({
          title: "Erreur lors de la modification de votre profil",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        Bert.alert({
          title: "Votre profil a bien été modifié",
          type: 'success',
          style: 'growl-bottom-left',
        })
      }
    });
  }

  render(){
    const {user_profile} = this.state
    return(
       <Grid stackable>
         <Grid.Column width={16}>
           <Form>
             <Form.Field>
               <label>URL de votre avatar</label>
               <Input value={user_profile.avatar_url} type="text" onChange={(e) => {this.handleProfileChange('avatar_url', e)}} />
             </Form.Field>
             <Form.Field>
               <label>Présentez vous en quelques mots</label>
                 <TinyMCE
                   content={user_profile.description}
                   config={{
                     plugins: 'image autoresize',
                     toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | formatselect',
                   }}
                   onChange={this.handleDescriptionChange.bind(this)}
                  />
             </Form.Field>
             <Form.Field className="padded-bottom center-align">
              <Button size="big" positive onClick={(e) => {this.edit_profile(e)}}>Modifier mon profil</Button>
             </Form.Field>
           </Form>
         </Grid.Column>
       </Grid>
    )
  }
}
