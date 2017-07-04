import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Loader, Label} from 'semantic-ui-react'
import {ConsultPartVotes} from '/imports/api/consult_part_votes/consult_part_votes'
import ConsultPartResults from '/imports/client/consult_parts/ui/ConsultPartResults'
import {Line} from 'react-chartjs-2'
import _ from 'lodash'
import moment from 'moment'


export class ConsultPartAdminStats extends TrackerReact(Component){

  /*
    required props:
      - none
  */

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    const {consult_part, consult_part_votes, loading} = this.props



    if(!loading){

      const chartData = _.groupBy(consult_part_votes, (o) => { return moment(o.created_at).format('DD.MM.YY')})

      const votesHistoryData = {
        labels: _.map((chartData), (data, index) => {return index}),
        datasets: [{
          label: "Votes",
          backgroundColor: "#1abc9c",
          data: _.map(chartData, (data, index) => {return data.length})
        }]
      }

      const chartOptions = {
        legend: {
          display: false
        }
      }

      return(
        <Grid stackable className="consult-part-admin-stats marged">
          <Grid.Column width={16} className="left-align">
            <Header as="h3">{consult_part.title}</Header>
            {consult_part.active ?
              <Label color='blue'>Partie active</Label>
            :
              <Label>Partie inactive</Label>
            }
            {consult_part.votes_activated ?
              <Label color='blue'>Votes actifs</Label>
            :
              <Label>Votes désactivés</Label>
            }
            {consult_part.alternatives_activated ?
              <Label color='blue'>Alternatives activées</Label>
            :
              <Label>Alternatives désactivées</Label>
            }
          </Grid.Column>
          {consult_part.votes_activated ?
            <Grid.Column width={16}>
              <Grid stackable>
                <Grid.Column width={8}>
                  <Header as="h3">Résultats de vote</Header>
                  <ConsultPartResults consult_part={consult_part} chart_type={consult_part.results_format}/>
                </Grid.Column>
                <Grid.Column width={8} className="left-align">
                  <p><strong>Nombre de votes total</strong> : {consult_part_votes.length}</p>
                    <Line
                      options={chartOptions}
                      data={votesHistoryData} />
                </Grid.Column>
              </Grid>
            </Grid.Column>
          : ''}
        </Grid>
      )
    }else{
      return <Loader className="inline-block">Chargement des statistiques de la partie</Loader>
    }
  }
}

export default ConsultPartAdminStatsContainer = createContainer(({ consult_part }) => {
  const consultPartVotesPublication = Meteor.subscribe('consult_part_votes.by_part', consult_part._id)
  const loading = !consultPartVotesPublication.ready()
  const consult_part_votes = ConsultPartVotes.find({consult_part: consult_part._id}).fetch()
  return {
    loading,
    consult_part_votes
  }
}, ConsultPartAdminStats)
