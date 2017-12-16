import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Grid, Header, Image} from 'semantic-ui-react'
var Timers = require('react-timers')
import {withRouter} from 'react-router-dom'

class InitialPresentationPage extends TrackerReact(Component){

  /*
    required params:
  */

  constructor(props){
    super(props);
    this.state = {
      step: 0,
      interval: 5000
    }
  }

  componentDidMount(){
    const that = this
    new WOW().init()
    Timers.setInterval(() => {
      if(that.state.step == 0){
        new WOW().init()
        that.setState({step: 1, interval: 3000})
      }else if(that.state.step == 1){
        new WOW().init()
        that.setState({step: 2, interval: 3000})
      }else if(that.state.step == 2){
        new WOW().init()
        that.setState({step: 3, interval: 3000})
      }else if(that.state.step == 3){
        new WOW().init()
        that.setState({step: 4, interval: 3000})
      }else if(that.state.step == 4){
        this.props.history.push('/initial/config')
      }
    }, that.state.interval)
  }

  render(){
    return(
       <Grid centered stackable>
         <Grid.Column width={16}>
           <Grid verticalAlign="middle" className="init-config-container">
             {this.state.step == 0 ?
                   <Grid.Column width={16} className="center-align">
                     <Image size="medium" className="inline-block wow fadeInUp" src="/images/myopencity-logo.png" />
                     <Header className="wow fadeInUp" data-wow-delay="1s" as="h1">Bienvenue sur Myopencity</Header>
                     <Header className="wow fadeInUp" data-wow-delay="1.5s" as="h3">La plateforme de démocratie locale qui va changer votre ville</Header>
                   </Grid.Column>
             : ''}
             {this.state.step == 1 ?
                 <Grid.Column width={16} className="center-align">
                   <Image size="medium" data-wow-delay="1s" className="inline-block wow fadeInUp" src="https://image.freepik.com/vecteurs-libre/ampoule-lumineuse-a-idees-lumineuses-avec-engrenages_3446-347.jpg" />
                   <Header className="wow fadeInUp" as="h1">Myopencity vous permet</Header>
                   <Header className="wow fadeInUp" data-wow-delay="1s" as="h2">De remonter les meilleures idées de votre ville</Header>>
                 </Grid.Column>
             : ''}
             {this.state.step == 2 ?
                 <Grid.Column width={16} className="center-align">
                   <Image size="medium"  className="inline-block wow fadeInUp" src="https://image.freepik.com/free-vector/isometric-view-of-a-mobile-application-with-a-city_23-2147567793.jpg" />
                   <Header as="h1">Myopencity vous permet</Header>
                   <Header className="wow fadeInUp" as="h2">De faire de votre ville une véritable SmartCity</Header>
                 </Grid.Column>
             : ''}
             {this.state.step == 3 ?
                   <Grid.Column width={16} className="center-align">
                     <Image size="medium"  className="inline-block wow fadeInUp" src="https://image.freepik.com/free-vector/election-designs-collection_1268-230.jpg" />
                     <Header as="h1">Myopencity vous permet</Header>
                     <Header className="wow fadeInUp" as="h2">De faire voter TOUS les citoyens à partir de n'importe quel appareil numérique</Header>
                   </Grid.Column>
              : ''}
             {this.state.step == 4 ?
                 <Grid.Column width={16} className="center-align">
                   <Header className="wow fadeInUp" data-wow-delay="1s" as="h1">Lançons ensemble la démocratie digitale sur votre ville...</Header>
                 </Grid.Column>
             : ''}
           </Grid>
         </Grid.Column>
       </Grid>
    )
  }
}

export default withRouter(InitialPresentationPage)
