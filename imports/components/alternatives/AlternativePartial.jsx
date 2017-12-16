import React, {Component} from 'react'
import {Feed, Icon, Image} from 'semantic-ui-react'
import { createContainer } from 'meteor/react-meteor-data'
import moment from 'moment'
import {Link} from 'react-router-dom'
import 'moment/locale/fr'

export class AlternativePartial extends Component{

  /*
    required props:
      - alternative: Object

    facultative props:
      - onTitleClick: Function
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

  onTitleClick(e){
    e.preventDefault()
    this.props.onTitleClick(this.props.alternative)
  }


  render(){
    const {user, loading, alternative} = this.props
    moment.locale('fr')

    if(!loading){
      console.log("user", user);
      return(
        <Feed.Event className="animated fadeInUp">
          <Feed.Label>
            {!alternative.anonymous ?
              <Image avatar src={user.profile.avatar_url} />
            : ''}
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              {alternative.anonymous ?
                <Feed.User>Quelqu'un </Feed.User>
              :
              <Link to={"/profile/" + user._id}>
                <Feed.User>{user.username} </Feed.User>
              </Link>}
              <span> a proposé l'alternative</span> <a onClick={(e) => {this.onTitleClick(e)}}>{alternative.title}</a>
                <Feed.Date>{moment().to(moment(alternative.created_at))}</Feed.Date>
              </Feed.Summary>
              <Feed.Meta>
                <Feed.Like onClick={(e) => {this.toggle_like(e)}}>
                  <Icon name='thumbs up' />
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
