import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Grid} from 'semantic-ui-react';
import Navbar from '../../imports/client/general/ui/Navbar.jsx';

export const MainLayout = ({content}) => {


  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <header>
            <Navbar />
          </header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <main>
            {content}
          </main>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
