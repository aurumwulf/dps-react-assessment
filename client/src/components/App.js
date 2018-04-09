import React, { Component } from 'react';
import NoMatch from './NoMatch';
import NavBar from './NavBar';
import Flash from './Flash';
import Home from './Home';
import Beers from './Beers';
import BeerView from './BeerView';
import Breweries from './Breweries';
import BreweryView from './BreweryView';
import { Switch, Route } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <Segment style={styles.background}>
        <NavBar />
        <Flash />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/beers" component={Beers} />
          <Route
            exact
            path="/beers/:id"
            component={BeerView}
          />
          <Route
            exact
            path="/breweries"
            component={Breweries}
          />
          <Route
            exact
            path="/breweries/:id"
            component={BreweryView}
          />
          <Route component={NoMatch} />
        </Switch>
      </Segment>
    );
  }
}

const styles = {
  background: {
    backgroundColor: 'black',
  },
};

export default App;
