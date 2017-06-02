import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Button, Loader, Header} from 'semantic-ui-react'
import ConsultPartVoteButton from '/imports/client/consult_parts/ui/ConsultPartVoteButton'
import {ConsultParts} from '/imports/api/consult_parts/consult_parts'
import {ConsultPartVotes} from '/imports/api/consult_part_votes/consult_part_votes'
import ConsultPartResults from '/imports/client/consult_parts/ui/ConsultPartResults'
import { createContainer } from 'meteor/react-meteor-data'

export class ConsultPart extends TrackerReact(Component){

  /*
    required props:
      - consult_part: Object
  */

  constructor(props){
    super(props);
    this.state = {
      hover_vote: false
    }
  }

  on_mouse_over(){
    console.log("over");

    this.setState({hover_vote: true})
  }

  on_mouse_out(){
    console.log("over");

    this.setState({hover_vote: false})
  }

  render(){
    const {consult_part, consult_part_vote, loading} = this.props
    const consult_part_hover_class = this.state.hover_vote ? "hover" : ""

    if(!loading){
      return(
        <Grid stackable className={"consult-part " + consult_part_hover_class}>
          <Grid.Column width={16}>
            <div className="consult-part-content" dangerouslySetInnerHTML={{__html: consult_part.content }}></div>
          </Grid.Column>
          <Grid.Column width={16} className="center-align">
            {consult_part.votes_activated ?
              <div>
                {consult_part_vote ?
                  <div>
                    <Header as="h3">Vous avez déjà voté</Header>
                    <ConsultPartResults consult_part={consult_part} chart_type="bar"/>
                  </div>
                  :
                  <ConsultPartVoteButton onMouseOut={this.on_mouse_out.bind(this)} onMouseOver={this.on_mouse_over.bind(this)} consult_part={consult_part} />
                }
              </div>
              : ''}
              {consult_part.alternatives_activated ?
                <Button>Alternatives</Button>
                : ''}
              </Grid.Column>
            </Grid>
          )
    }else{
      return <Loader className="inline-block">Chargement de la partie</Loader>
    }
  }
}

export default ConsultPartContainer = createContainer(({ consult_part }) => {
  const consultPartVotePublication = Meteor.subscribe('consult_part_votes.my_vote_by_part', consult_part._id)
  const loading = !consultPartVotePublication.ready()
  const consult_part_vote = ConsultPartVotes.findOne({user: Meteor.userId(), consult_part: consult_part._id})
  return {
    loading,
    consult_part_vote
  }
}, ConsultPart)
