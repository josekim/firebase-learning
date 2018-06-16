import React, { Component } from 'react';
import firebase from 'firebase';
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

class Game extends Component {
  render() {
    database.ref('game1').set({ hello: 'world' });
    console.log(database);
    return (
      <div>
        <p>this is game</p>
      </div>
    );
  }
}

export default Game;
