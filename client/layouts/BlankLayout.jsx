import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export class BlankLayout extends Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    new WOW().init()
  }

  render(){
    return (
      <div>
        <main>
          {this.props.content}
        </main>
      </div>
    )
  }
}
