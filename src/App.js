import React, { Component } from 'react';
import firebase from 'firebase';
import { HashRouter, Route } from 'react-router-dom';
import Start from './Start.js';

const config = {
  apiKey: 'AIzaSyCrgBJMTaiUIJi8hoPvUiMbeyiqvGLFaWo',
  authDomain: 'coding-project-wd.firebaseapp.com',
  databaseURL: 'https://coding-project-wd.firebaseio.com',
  projectId: 'coding-project-wd',
  storageBucket: 'coding-project-wd.appspot.com',
  messagingSenderId: '985640520772'
};

firebase.initializeApp(config);
class App extends Component {
  state = { something: 'nothing', grace: 'great' };
  render() {
    console.log(this.state.something);
    return (
      <HashRouter>
        <div>
          <Route exact path="/" component={Start} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
