import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Bar, Line, Pie, Doughnut, Radar} from 'react-chartjs-2'
import {Grid} from 'semantic-ui-react'
import _ from 'lodash'

export default class ConsultPartResults extends TrackerReact(Component){

  /*
    required props:
      - chart_type: String // 'line' / 'bar'

    facultative props:
      - height: Number
      - width: Number
  */

  constructor(props){
    super(props);
    this.state = {
      colors: _.shuffle([
        "#1abc9c",
        "#2ecc71",
        "#3498db",
        "#9b59b6",
        "#34495e",
        "#16a085",
        "#27ae60",
        "#2980b9",
        "#8e44ad",
        "#2c3e50",
        "#f1c40f",
        "#e67e22",
        "#e74c3c",
        "#ecf0f1",
        "#95a5a6",
        "#f39c12",
        "#d35400",
        "#c0392b",
        "#bdc3c7"
      ])
    }
  }

  render(){
    const {chart_type, results, className, consult_part, height, width} = this.props
    const {colors} = this.state

    const chartData = {
      labels: _.map(consult_part.vote_values, 'vote_value'),
      datasets: [{
        label: "Résultats",
        backgroundColor: colors,
        data: _.map(consult_part.vote_values, 'counter')
      }]
    }

    const chartOptions = {
      legend: {
        display: false
      }
    }

    return(
      <Grid stackable className={className}>
        <Grid.Column width={16}>
          {chart_type == 'bar' ?
            <Bar
              options={chartOptions}
              data={chartData} />
          : ''}
          {chart_type == 'line' ?
            <Line
              options={chartOptions}
              data={chartData} />
          : ''}
          {chart_type == 'doughnut' ?
            <Doughnut
              data={chartData} />
          : ''}
          {chart_type == 'pie' ?
            <Pie
              data={chartData} />
          : ''}
          {chart_type == 'radar' ?
            <Radar
              options={chartOptions}
              data={chartData} />
          : ''}
        </Grid.Column>
      </Grid>
    )
  }
}
