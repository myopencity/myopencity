import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Menu} from 'semantic-ui-react';

export default class Navbar extends TrackerReact(Component){

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <Menu secondary>
         <Menu.Item name='home'/>
         <Menu.Item name='messages'/>
         <Menu.Item name='amis'/>
         <Menu.Menu position='right'>
           <Menu.Item name='logout'/>
         </Menu.Menu>
     </Menu>
    )
  }
}
