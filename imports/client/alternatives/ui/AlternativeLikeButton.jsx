import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Icon, Button} from 'semantic-ui-react'

export default class AlternativeLikeButton extends TrackerReact(Component){

  /*
    required props:
      - likes: Number
  */

  constructor(props){
    super(props);
    this.state = {
      likes_counter: 0,
      animation_class: "animated bounceIn"
    }
  }

  componentDidMount(){
    this.setState({likes_counter: this.props.likes})
  }

  componentWillReceiveProps(new_props){
    const {likes_counter} = this.state
    if(new_props.likes > likes_counter){
      console.log("UP");

      this.setState({animation_class: 'animated bounceInUp', likes_counter: new_props.likes})
    }else{
      console.log("DOWN");

      this.setState({animation_class: 'animated bounceInDown', likes_counter: new_props.likes})
    }
  }

  render(){
    const {likes_counter, animation_class} = this.state
    const {alternative_likes_term, alternative_like_icon_color} = Session.get('global_configuration')

    return(
      <Button size="big">
        <Icon name="thumbs up" style={{color: alternative_like_icon_color}} />
        <span className={animation_class}>{likes_counter}</span> {alternative_likes_term}
      </Button>
    )
  }
}
