import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';
import Start from './Start';
import Game from './Game';
import Header from './Header';
import Player from './Player';

const config = {
  apiKey: 'AIzaSyCrgBJMTaiUIJi8hoPvUiMbeyiqvGLFaWo',
  authDomain: 'coding-project-wd.firebaseapp.com',
  databaseURL: 'https://coding-project-wd.firebaseio.com',
  projectId: 'coding-project-wd',
  storageBucket: 'coding-project-wd.appspot.com',
  messagingSenderId: '985640520772'
};
firebase.initializeApp(config);
const database = firebase.database();

const Page = () => <h1> Hmmmmm... this page doesn't exist</h1>;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Start} />
            <Route exact path="/game/:ID" render={props => <Game {...props} database={database} />} />
            <Route exact path="/game/:ID/:player" render={props => <Player {...props} database={database} />} />
            <Route component={Page} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
