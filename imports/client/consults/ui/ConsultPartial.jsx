import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Card, Image} from 'semantic-ui-react'
import _ from 'lodash'

export default class ConsultPartial extends TrackerReact(Component){

  /*
    required props:
      - consult
  */

  constructor(props){
    super(props)
  }

  render(){
    const consult = this.props.consult

    if(consult){
      return(
        <Card className="inline-block">
          <Image src={consult.image_url} />
          <Card.Content>
            <Card.Header>
              {consult.title}
            </Card.Header>
            <Card.Description>
              {_.truncate(consult.description, {length: 200, separator: ' '})}
            </Card.Description>
          </Card.Content>
        </Card>
      )
    }else{
      return <div></div>
    }
  }
}
