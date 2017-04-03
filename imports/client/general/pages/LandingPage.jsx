import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class LandingPage extends TrackerReact(Component){

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
       <h3>Landing</h3>
    )
  }
}
