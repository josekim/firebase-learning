import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Start from './Start.jsx';
import Game from './Game.jsx';
import Header from './Header.jsx';

const Page = () => <h1> Hmmmmm... this page doesn't exist</h1>;

class App extends Component {
  state = { something: 'nothing', grace: 'great' };
  render() {
    console.log(this.state.something);
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Start} />
            <Route exact path="/game" component={Game} />
            <Route component={Page} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
