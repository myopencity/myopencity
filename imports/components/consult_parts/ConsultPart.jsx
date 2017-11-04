import React, {Component} from 'react'
import {Promise} from 'meteor/promise'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Button, Loader, Header, Input, Feed} from 'semantic-ui-react'
import ConsultPartVoteButton from '/imports/components/consult_parts/ConsultPartVoteButton'
import {ConsultParts} from '/imports/api/consult_parts/consult_parts'
import {ConsultPartVotes} from '/imports/api/consult_part_votes/consult_part_votes'
import {Alternatives} from '/imports/api/alternatives/alternatives'
import ConsultPartResults from '/imports/components/consult_parts/ConsultPartResults'
import { createContainer } from 'meteor/react-meteor-data'
import AlternativeForm from '/imports/components/alternatives/AlternativeForm'
import AlternativePartial from '/imports/components/alternatives/AlternativePartial'
import AlternativesList from '/imports/components/alternatives/AlternativesList'
import ReactPaginate from 'react-paginate'

export class ConsultPart extends TrackerReact(Component){

  /*
    required props:
      - consult_part: Object
    facultative props:
      - hide_vote_button: Boolean
  */

  constructor(props){
    super(props);
    this.state = {
      hover_vote: false,
      display_alternative_form: false,
      search_alternatives_terms: "",
      alternatives_page: 0,
      displaying_alternative: false
    }
  }

  on_mouse_over(){
    this.setState({hover_vote: true})
  }

  on_mouse_out(){
    this.setState({hover_vote: false})
  }

  toggleState(attr, e){
    let state = this.state
    state[attr] = !state[attr]
    this.setState(state)
  }

  create_alternative(alternative){
    const that = this
    Meteor.call('alternatives.insert', {consult_part_id: this.props.consult_part._id, alternative: alternative} , (error, result) => {
      if(error){
        console.log(error)
        Bert.alert({
          title: "Erreur lors de la création de l'alternative",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        Bert.alert({
          title: "Votre alternative a été proposée",
          type: 'success',
          style: 'growl-bottom-left',
        })
        that.setState({display_alternative_form: false})
      }
    });
  }

  handleChange(attr, e){
    let state = this.state
    state[attr] = e.target.value
    this.setState(state)
  }

  handleSearchAlternative(e){
    e.preventDefault()
    const alternativesPublication = Meteor.subscribe('alternatives.paginated_by_consult_part', {consult_part_id: consult_part._id, page: 0, results_size: 10})
  }

  handleAlternativesPageChange(data){
     let selected = data.selected
     this.setState({alternatives_page: selected})
  }

  toggleDisplayAlternative(displaying){
    this.setState({displaying_alternative: displaying, search_alternatives_terms: ""})
  }

  render(){
    const {consult_part, consult_part_vote, alternatives, hide_vote_button, alternatives_count, loading} = this.props
    const {
      display_alternatives,
      display_alternative_form,
      search_alternatives_terms,
      alternatives_page,
      displaying_alternative
    } = this.state
    const consult_part_hover_class = this.state.hover_vote ? "hover" : ""

    if(!loading){
      console.log("alternatives_count", alternatives_count);

      return(
        <Grid stackable className={"consult-part " + consult_part_hover_class}>
          <Grid.Column width={(display_alternative_form) ? 5 : 16}>
            <div className="consult-part-content" dangerouslySetInnerHTML={{__html: consult_part.content }}></div>
          </Grid.Column>
          {display_alternative_form ?
            <Grid.Column width={11} className="animated fadeInLeft">
              <div className="center-align marged">
                <Button onClick={(e) => {this.toggleState('display_alternative_form', e)}}>
                  Annuler la création d'alternative
                </Button>
              </div>
              <AlternativeForm onCreate={this.create_alternative.bind(this)}/>
            </Grid.Column>
          : ''}
          {display_alternatives ?
            <Grid.Column width={16}>
              <Grid stackable>
                <Grid.Column width={16} className="center-align">
                  <Header as="h3">Alternatives proposées</Header>
                </Grid.Column>
                {!displaying_alternative ?
                  <Grid.Column width={16}>
                    <Input icon="search" fluid placeholder="Recherchez une alternative" type="text" onChange={(e) => {this.handleChange('search_alternatives_terms', e)}} />
                  </Grid.Column>
                : ''}
                <Grid.Column width={16} className="center-align">
                  <AlternativesList
                    consult_part={consult_part}
                    results_size={10}
                    page={alternatives_page}
                    search_term={search_alternatives_terms}
                    on_displaying_alternative={this.toggleDisplayAlternative.bind(this)}
                     />
                </Grid.Column>
                {!displaying_alternative ?
                  <Grid.Column width={16} className="center-align">
                    <ReactPaginate previousLabel={"<<"}
                      nextLabel={">>"}
                      pageCount={alternatives_count / 10}
                      pageRangeDisplayed={alternatives_page}
                      containerClassName={"pagination"}
                      pageClassName={"pages pagination"}
                      nextClassName={'pages pagination'}
                      previousClassName={'pages pagination'}
                      onPageChange={this.handleAlternativesPageChange.bind(this)}
                      activeClassName={"active"} />
                  </Grid.Column>
                : ''}
              </Grid>
            </Grid.Column>
          : ''}
          {consult_part.alternatives_activated ?
            <Grid.Column width={16} className="center-align">
              {alternatives_count > 0 ?
                <Button onClick={(e) => {this.toggleState('display_alternatives', e)}}>
                  {display_alternatives ? "Cacher les alternatives" : "Voir les " + alternatives_count + " alternatives" }
                </Button>
              : ''}
              {!display_alternative_form ?
                <Button onClick={(e) => {this.toggleState('display_alternative_form', e)}} size="big" positive onMouseOut={this.on_mouse_out.bind(this)} onMouseOver={this.on_mouse_over.bind(this)}>
                  Proposer une alternative
                </Button>
              : ''}
            </Grid.Column>
          : ''}
          <Grid.Column width={16} className="center-align">
            {!hide_vote_button && consult_part.votes_activated && !display_alternative_form && !display_alternatives ?
              <div>
                {consult_part_vote ?
                  <div>
                    <Header as="h3">Vous avez déjà voté</Header>
                    <ConsultPartResults consult_part={consult_part} chart_type={consult_part.results_format}/>
                  </div>
                  :
                  <ConsultPartVoteButton onMouseOut={this.on_mouse_out.bind(this)} onMouseOver={this.on_mouse_over.bind(this)} consult_part={consult_part} />
                }
              </div>
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
  const alternativesPublication = Meteor.subscribe('alternatives.by_consult_part', consult_part._id)
  const loading = !consultPartVotePublication.ready() || !alternativesPublication.ready()
  const alternatives_count = Alternatives.find({consult_part: consult_part._id, validated: true}).count()
  const consult_part_vote = ConsultPartVotes.findOne({user: Meteor.userId(), consult_part: consult_part._id})
  return {
    loading,
    consult_part_vote,
    alternatives_count
  }
}, ConsultPart)
