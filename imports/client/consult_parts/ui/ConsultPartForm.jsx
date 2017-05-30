import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import TinyMCE from 'react-tinymce'
import {Grid, Form, Button, Input, Header, Checkbox} from 'semantic-ui-react'

export default class ConsultPartForm extends TrackerReact(Component){

  /*
    required props:
      - consult_id: String
    facultative props:
      - consult_part: Object (enable edit mode)
      - onCreateSubmit: Function (called when form is submitted)
      - onEditSubmit: Function (called when form is submitted)
  */

  constructor(props){
    super(props);
    this.state = {
      consult_part: {
        vote_values: []
      }
    }
  }

  componentWillMount(){
    if(this.props.consult_part){
      this.setState({consult_part: this.props.consult_part})
    }
  }

  componentWillReceiveProps(new_props){
    if(new_props.consult_part){
      this.setState({consult_part: new_props.consult_part})
    }
  }

  handleContentChange(e){
    let {consult_part} = this.state
    consult_part.content = e.target.getContent()
    this.setState({consult_part})
  }

  handleConsultPartChange(attr, e){
    let {consult_part} = this.state
    consult_part[attr] = e.target.value
    this.setState({consult_part})
  }

  submit_form(e){
    e.preventDefault()
    if(this.props.consult_part){
      this.props.onEditSubmit(this.state.consult_part)
    }else{
      this.setState({consult_part: {}})
      this.props.onCreateSubmit(this.state.consult_part)
    }
  }

  toggleConsultPart(attr, e){
    let {consult_part} = this.state
    consult_part[attr] = !consult_part[attr]
    this.setState({consult_part})
  }

  render(){
    const {consult_part} = this.state
    return(
       <Grid stackable>
         <Grid.Column width={16}>
             <Form>
                 <Form.Field inline={true} as="div">
                   <label>Visibilité ({consult_part.visible ? "Actuellement visible" : "Actuellement caché"})</label>
                   <Checkbox checked={consult_part.visible} onClick={(e) => {this.toggleConsultPart('visible', e)}} toggle/>
                 </Form.Field>
                 <Form.Field inline={true} as="div">
                   <label>Votes ({consult_part.votes_activated ? "Actuellement activé" : "Actuellement désactivé"})</label>
                   <Checkbox checked={consult_part.votes_activated} onClick={(e) => {this.toggleConsultPart('votes_activated', e)}} toggle/>
                 </Form.Field>
                 <Form.Field inline={true} as="div">
                   <label>Alternatives ({consult_part.alternatives_activated ? "Actuellement activé" : "Actuellement désactivé"})</label>
                   <Checkbox checked={consult_part.alternatives_activated} onClick={(e) => {this.toggleConsultPart('alternatives_activated', e)}} toggle/>
                 </Form.Field>
                 <Form.Field inline={true} as="div">
                   <label>Titre</label>
                   <Input value={consult_part.title} onChange={(e) => {this.handleConsultPartChange('title', e)}}/>
                 </Form.Field>
                 <TinyMCE
                   content={consult_part.content}
                   config={{
                     plugins: 'image',
                     toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | formatselect'
                   }}
                   onChange={this.handleContentChange.bind(this)}
                   />
               <Form.Field>
                 <Button positive onClick={(e) => {this.submit_form(e)}}>{this.props.consult_part ? 'Modifier' : 'Créer'}</Button>
               </Form.Field>
             </Form>
         </Grid.Column>
       </Grid>
    )
  }
}
