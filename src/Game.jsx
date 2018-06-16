import React, { Component } from 'react';
import firebase from 'firebase';
import Letter from './Letter.jsx';

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
  state = {};

  createRandomLetters = () => {
    let randomLetters = '';
    const vowels = 'AEIOU';
    const consonants = 'BCDFGHKJKLMNPQRSTVWXYZ';
    const alphabet = vowels + consonants;
    randomLetters +=
      vowels[Math.floor(Math.random() * vowels.length)] +
      consonants[Math.floor(Math.random() * consonants.length)] +
      vowels[Math.floor(Math.random() * vowels.length)] +
      consonants[Math.floor(Math.random() * consonants.length)];

    while (randomLetters.length < 9) {
      randomLetters += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return randomLetters
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
  };

  render() {
    database.ref('game1').set({ hello: 'world' });
    console.log(this.createRandomLetters().split(''));
    return (
      <div>
        {this.createRandomLetters()
          .split('')
          .map((letter, idx) => <Letter key={idx} letter={letter} />)}
      </div>
    );
  }
}

export default Game;
