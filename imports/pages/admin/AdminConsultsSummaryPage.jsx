import React, { Component } from 'react';
import { Consults } from '/imports/api/consults/consults';
import { ConsultParts } from '/imports/api/consult_parts/consult_parts';
import { Configuration } from '/imports/api/configuration/configuration';
import { Grid, Header, Image, Loader, Container, Divider, Statistic } from 'semantic-ui-react';
import { createContainer } from 'meteor/react-meteor-data'
import moment from 'moment'
import _ from 'lodash'
import Helmet from 'react-helmet'

export class AdminConsultsSummaryPage extends Component {
    render() {
        const { loading, consults, consult_parts, configuration } = this.props
        const actual_date = moment().format('DD.MM.YYYY')
        
        if (!loading) {
            const { global_image_url, navbar_color, main_title } = configuration

            return (
                <Container>
                    <Helmet>
                        <title>Compte rendu de consultations du {actual_date}</title>
                    </Helmet>
                    <Grid stackable>
                        <Grid.Column width={16} className="center-align">
                            <Image src={global_image_url} inline size="medium" />
                            <Header as='h1'>{main_title}</Header>
                            <Header as='h2'>Compte rendu de consultations</Header>
                            <p>Généré le {actual_date}</p>
                        </Grid.Column>
                        {consults.map((consult, consult_index) => {
                            const parts = _.filter(consult_parts, (o) => { return (o.consult == consult._id && o.votes_activated) })
                            return (
                                <Grid.Column width={16}>
                                    <Header as='h2' style={{backgroundColor: navbar_color, padding: "1em", color: "white"}}>{consult.title}</Header>
                                    <p>Créée le {moment(consult.created_at).format('DD.MM.YYYY à HH:mm')}</p>
                                    <Grid stackable>
                                        {parts.map((part, part_index) => {
                                            const vote_values = _.orderBy(part.vote_values, ['counter'], ['desc'])
                                            const total_votes = _.sumBy(vote_values, (o) => {return o.counter})
                                            return (
                                                <Grid.Column width={16}>
                                                    <Divider horizontal style={{backgroundColor: "rgb(228, 228, 228)"}}><Header as='h3' style={{color: navbar_color}}>{part.title}</Header></Divider>
                                                    <Header as='h4'>Question : {part.question}</Header>
                                                    <Grid stackable>
                                                        {vote_values.map((vote_value, vote_index) => {
                                                            return (
                                                                <Grid.Column width={8}>
                                                                    <Statistic horizontal>
                                                                        <Statistic.Value>{vote_value.counter}</Statistic.Value>
                                                                        <Statistic.Label>{vote_value.vote_value} <span style={{color: navbar_color}}>({vote_value.counter > 0 ?_.round((vote_value.counter*100)/total_votes, 2) : 0} %)</span></Statistic.Label>
                                                                    </Statistic>
                                                                </Grid.Column>
                                                            )
                                                        })}
                                                    </Grid>
                                                </Grid.Column>
                                            )
                                        })}
                                    </Grid>
                                    <Divider />
                                </Grid.Column>
                            )
                        })}
                    </Grid>
                </Container>
            );
        } else {
            return <Loader className="inline-block">Chargement du compte rendu de consultation</Loader>
        }
    }
}

export default AdminConsultsSummaryPageContainer = createContainer(() => {
    const consultsPublication = Meteor.isClient && Meteor.subscribe('consults.all')
    const consultPartsPublication = Meteor.isClient && Meteor.subscribe('consult_parts.all')
    const configurationPublication = Meteor.isClient && Meteor.subscribe('global_configuration')
    const loading = Meteor.isClient && (!consultsPublication.ready() || !consultPartsPublication.ready() || !configurationPublication.ready())
    const consults = Consults.find({}).fetch()
    const consult_parts = ConsultParts.find({}).fetch()
    const configuration = Configuration.findOne()
    return {
        loading,
        consults,
        consult_parts,
        configuration
    }
}, AdminConsultsSummaryPage)