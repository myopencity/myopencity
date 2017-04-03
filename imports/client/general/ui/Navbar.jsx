import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Menu, Grid} from 'semantic-ui-react';

export default class Navbar extends TrackerReact(Component){

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <Grid>
        <Grid.Row centered columns={1}>
          <Grid.Column width={12}>
            <Menu secondary>
             <Menu.Item name='home'/>
             <Menu.Item name='messages'/>
             <Menu.Item name='amis'/>
             <Menu.Menu position='right'>
               <Menu.Item name='logout'/>
             </Menu.Menu>
           </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>

    )
  }
}
