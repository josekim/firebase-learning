import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Start from './Start.js';
import Game from './Game.js';

const Page = () => <h1> Hmmmmm... this page doesn't exist</h1>;

class App extends Component {
  state = { something: 'nothing', grace: 'great' };
  render() {
    console.log(this.state.something);
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Start} />
          <Route exact path="/game" component={Game} />
          <Route component={Page} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
