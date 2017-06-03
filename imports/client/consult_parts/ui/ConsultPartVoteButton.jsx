import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Button, Modal} from 'semantic-ui-react'

export default class ConsultPartVoteButton extends TrackerReact(Component){

  /*
    required props:
      - consult_part: Object
      - onNonConnected: Function (called if no user)
  */

  constructor(props){
    super(props);
    this.state = {
      open_modal: false
    }
  }

  toggleState(attr, e){
    let state = this.state
    state[attr] = !state[attr]
    this.setState(state)
  }

  vote(value, index, e){
    e.preventDefault()
    Meteor.call('consult_parts.vote', {consult_part_id: this.props.consult_part._id, index: index} , (error, result) => {
      if(error){
        console.log(error)
        Bert.alert({
          title: "Erreur lors du vote",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        Bert.alert({
          title: "A VOTÉ !",
          message: "Votre vote a bien été pris en compte",
          type: 'success',
          style: 'growl-bottom-left',
        })
      }
    });
  }

  toggleVoteModal(e){
    if(!Meteor.userId()){
      Session.set('return_route', FlowRouter.current().path)
      FlowRouter.go('Signup')
    }else{
      this.toggleState('open_modal', e)
    }
  }

  on_mouse_over(e){
    e.preventDefault()
    if(this.props.onMouseOver){
      this.props.onMouseOver()
    }
  }

  on_mouse_out(e){
    e.preventDefault()
    if(this.props.onMouseOut){
      this.props.onMouseOut()
    }
  }

  render(){
    const {open_modal} = this.state
    const {consult_part} = this.props
    return(
      <div>
        <Button onMouseOver={(e) => {this.on_mouse_over(e)}} onMouseOut={(e) => {this.on_mouse_out(e)}} size="huge" positive onClick={(e) => {this.toggleVoteModal(e)}}>{consult_part.vote_label}</Button>
          <Modal open={open_modal} onClose={(e) => {this.toggleState('open_modal', e)}}>
            <Modal.Header>{consult_part.question}</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                {consult_part.vote_values.map((vote_value, index) => {
                  return (
                    <div>
                      <Button fluid onClick={(e) => {this.vote(vote_value, index, e)}}>{vote_value.vote_value}</Button><br/>
                    </div>
                  )
                })}
              </Modal.Description>
            </Modal.Content>
          </Modal>
      </div>
    )
  }
}
