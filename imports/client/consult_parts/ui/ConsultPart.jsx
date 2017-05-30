import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Button} from 'semantic-ui-react'
import ConsultPartVoteButton from '/imports/client/consult_parts/ui/ConsultPartVoteButton'
import {ConsultParts} from '/imports/api/consult_parts/consult_parts'

export default class ConsultPart extends TrackerReact(Component){

  /*
    required props:
      - consult_part: Object
  */

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    const {consult_part} = this.props

    return(
       <Grid stackable>
         <Grid.Column width={16}>
          <div className="consult-part-content" dangerouslySetInnerHTML={{__html: consult_part.content }}></div>
         </Grid.Column>
         <Grid.Column width={16} className="center-align">
           {consult_part.votes_activated ?
              <ConsultPartVoteButton consult_part={consult_part} />
           : ''}
           {consult_part.alternatives_activated ?
              <Button>Alternatives</Button>
           : ''}
         </Grid.Column>
       </Grid>
    )
  }
}
