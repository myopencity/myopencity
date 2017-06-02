import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import TinyMCE from 'react-tinymce'
import {Grid, Form, Button, Input, Header, Checkbox, Label, Select} from 'semantic-ui-react'

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

  handleChange(attr, e){
    let state = this.state
    state[attr] = e.target.value
    this.setState(state)
  }

  addVote(e){
    e.preventDefault()
    let {consult_part, editing_vote} = this.state
    consult_part.vote_values.push({vote_value: editing_vote})
    editing_vote = ""
    this.setState({consult_part, editing_vote})
  }

  removeVote(index, e){
    e.preventDefault()
    let {consult_part} = this.state
    consult_part.vote_values.splice(index, 1)
    this.setState({consult_part})
  }

  handleResultsFormatChange(event, data){
    let {consult_part} = this.state
    consult_part.results_format = data.value
    this.setState({consult_part})
  }

  render(){
    const {consult_part, editing_vote} = this.state
    const results_formats = [
      {key: 'bar', value: 'bar', text: 'Graphique en barres'},
      {key: 'pie', value: 'pie', text: 'Graphique camembert'},
      {key: 'doughnut', value: 'doughnut', text: 'Graphique beignet'},
      {key: 'line', value: 'line', text: 'Graphique en lignes'},
      {key: 'radar', value: 'radar', text: 'Graphique radar'},
    ]
    return(
       <Grid stackable>
         <Grid.Column width={16}>
             <Form>
               <Grid stackable>
                 <Grid.Column width={8}>
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
                 </Grid.Column>
                 {consult_part.votes_activated ?
                   <Grid.Column width={8}>
                     <Form>
                       <Form.Field as="div">
                         <label>Format des résultats</label>
                         <Select onChange={this.handleResultsFormatChange.bind(this)} value={consult_part.results_format} options={results_formats} />
                       </Form.Field>
                       <Form.Field as="div">
                         <label>Question de vote</label>
                         <Input fluid value={consult_part.question} placeholder="ex: Quel revêtement pour le rond-point ?" onChange={(e) => {this.handleConsultPartChange('question', e)}}/>
                       </Form.Field>
                       <Form.Field>
                         <label>Valeur de vote</label>
                         <Input value={editing_vote} type="text" onChange={(e) => {this.handleChange('editing_vote', e)}} />
                       </Form.Field>
                       <Form.Field>
                         <Button onClick={(e) => {this.addVote(e)}}>Ajouter</Button>
                       </Form.Field>
                     </Form>
                     <Header as="h3">Valeurs de vote</Header>
                     {consult_part.vote_values.map((vote_value, index) => {
                       return <Label style={{cursor: "pointer"}} content={vote_value.vote_value} icon='remove' onClick={(e) => {this.removeVote(index, e)}} />
                     })}
                   </Grid.Column>
                 : ''}
               </Grid>
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
