import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Bar, Line} from 'react-chartjs-2'
import {Grid} from 'semantic-ui-react'
import _ from 'lodash'

export default class ConsultPartResults extends TrackerReact(Component){

  /*
    required props:
      - chart_type: String // 'line' / 'bar'
  */

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    const {chart_type, results, className, consult_part} = this.props
    console.log("results", consult_part.vote_values);

    const chartData = {
      labels: _.map(consult_part.vote_values, 'vote_value'),
      datasets: [{
        label: "Résultats",
        color: 'red',
        data: _.map(consult_part.vote_values, 'counter')
      }]
    }

    return(
      <Grid stackable className={className}>
        <Grid.Column width={16}>
          {chart_type == 'bar' ?
            <Bar data={chartData}/>
          : ''}
          {chart_type == 'line' ?
            <Line data={chartData}/>
          : ''}
        </Grid.Column>
      </Grid>
    )
  }
}
