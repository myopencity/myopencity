import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Navbar extends TrackerReact(Component){

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
       <h3>Navbar</h3>
    )
  }
}
