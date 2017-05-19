import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Grid, Container} from 'semantic-ui-react';
import Navbar from '../../imports/client/general/ui/Navbar.jsx';

export const MainLayout = ({content}) => {


  return (
    <Grid>
        <Grid.Column width={16}>
            <header>
              <Navbar />
            </header>
        </Grid.Column>
        <Grid.Column width={16}>
          <main>
            {content}
          </main>
        </Grid.Column>
    </Grid>
  );
}
