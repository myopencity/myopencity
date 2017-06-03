import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Feed, Icon} from 'semantic-ui-react'
import { createContainer } from 'meteor/react-meteor-data'
import moment from 'moment'

export class AlternativePartial extends TrackerReact(Component){

  /*
    required props:
      - alternative: Object
  */

  constructor(props){
    super(props);
    this.state = {

    }
  }

  toggle_like(e){
    e.preventDefault()
    Meteor.call('alternatives.toggle_like', this.props.alternative._id , (error, result) => {
      if(error){
        console.log(error)
        Bert.alert({
          title: "Erreur lors de l'ajout de votre soutien",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }
    });
  }

  render(){
    const {user, loading, alternative} = this.props


    if(!loading){
      console.log("user", user);
      return(
        <Feed.Event>
          <Feed.Label>
            <Icon name="idea" />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>{alternative.anonymous ? "Quelqu'un" : user.username}</Feed.User> a proposé ceci
                <Feed.Date>{moment().to(moment(alternative.created_at))}</Feed.Date>
              </Feed.Summary>
              <Feed.Meta>
                <Feed.Like onClick={(e) => {this.toggle_like(e)}}>
                  <Icon name='like' />
                  {alternative.likes}
                </Feed.Like>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        )
    }else{
      return(
        <Feed.Event>
          <Feed.Label>
            <Icon name="idea" />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              Chargement de l'alternative
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      )
    }
  }
}

export default AlternativePartialContainer = createContainer(({ alternative }) => {
  const userPublication = Meteor.subscribe('alternatives.user', alternative._id)
  const loading = !userPublication.ready()
  const user = Meteor.users.findOne({_id: alternative.user})
  return {
    loading,
    user,
    alternative
  }
}, AlternativePartial)
