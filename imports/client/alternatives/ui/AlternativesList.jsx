import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Alternatives} from '/imports/api/alternatives/alternatives'
import {Grid, Header, Input, Feed, Image, Loader} from 'semantic-ui-react'
import AlternativePartial from '/imports/client/alternatives/ui/AlternativePartial'
import AlternativePresentation from '/imports/client/alternatives/ui/AlternativePresentation'

export class AlternativesList extends TrackerReact(Component){

  /*
    required props:
      - none
  */

  constructor(props){
    super(props);
    this.state = {
      selected_alternative: null
    }
  }

  select_alternative(selected_alternative){
    this.setState({selected_alternative})
    if(this.props.on_displaying_alternative){
      this.props.on_displaying_alternative(true)
    }
  }

  hide_selected_alternative(){
    this.setState({selected_alternative: null})
    if(this.props.on_displaying_alternative){
      this.props.on_displaying_alternative(false)
    }
  }

  render(){
    const {alternatives, loading} = this.props
    const {selected_alternative} = this.state

    if(!loading){
      return(
        <Grid stackable>
          {selected_alternative ?
              <AlternativePresentation alternative={selected_alternative} onGoBackClick={() => {this.hide_selected_alternative()}} />
          :
            <Grid.Column width={16}>
              <Grid stackable>
                <Grid.Column width={16}>
                  <Input icon="search" fluid placeholder="Recherchez une alternative" type="text" onClick={(e) => {this.handleChange('search_alternatives_terms', e)}} />
                </Grid.Column>
                <Grid.Column width={16} className="">
                  <Feed>
                    {_.sortBy(alternatives, function(al){return -al.likes}).map((alternative, index) => {
                      return <AlternativePartial alternative={alternative} onTitleClick={() => {this.select_alternative(alternative)}} key={index} />
                    })}

                  </Feed>
                </Grid.Column>

              </Grid>
            </Grid.Column>
          }

        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement des alternatives</Loader>
    }
  }
}

export default AlternativesListContainer = createContainer(({ consult_part, page, results_size, search_term }) => {
  console.log("LIST PAGE", page);

  const alternativesPublication = Meteor.subscribe('alternatives.paginated_by_consult_part', {consult_part_id: consult_part._id, page: page, results_size: results_size, search_term: search_term})
  const loading = !alternativesPublication.ready()
  const alternatives = Alternatives.find({}).fetch()
  return {
    loading,
    alternatives
  }
}, AlternativesList)
