import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
    render() {
        const { footer_background_color, footer_color, footer_cgu_display, cgu_term, footer_height, footer_content } = Meteor.isClient && Session.get('global_configuration')

        return (
            <Grid stackable className="footer" verticalAlign="middle" style={{ backgroundColor: footer_background_color, color: footer_color, height: footer_height }}>
                <Grid.Column width={16}>
                    <Container>
                        <span className="left-align">{footer_content}</span>
                        {footer_cgu_display && <Link to='/conditions' className="pointer" style={{float: 'right'}}><span>{cgu_term}</span></Link>}
                    </Container>
                </Grid.Column>
            </Grid>
        );
    }
}