import React, { Component } from 'react';
import Letter from './Letter';

class Game extends Component {
  state = { gameID: this.props.match.params.ID, board: '', time: 0 };

  componentDidMount = () => {
    console.log('did Mount', this.props, this.state);
    const board = this.createRandomLetters();
    this.setState({ board });
    this.props.database.ref(this.state.gameID).set({ board });
    this.props.database.ref(this.state.gameID).on('value', this.update);
  };

  update = snapshot => {
    const gameState = snapshot.val();
    console.log(snapshot.val());
  };

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

  updateTimer = () => {
    this.setState(state => {
      if (state.time - 1 === 0) {
        clearInterval(state.timer);
      }
      return { time: state.time - 1, timer: state.time - 1 ? state.timer : null };
    });
    this.props.database.ref(this.state.gameID).set({ time: this.state.time });
  };

  timer = () => {
    // Update the count down every 1 second
    if (!this.state.timer) {
      const timer = setInterval(this.updateTimer, 1000);
      this.setState({ time: 10 }, () => {
        this.setState({ timer });
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.board.split('').map((letter, idx) => <Letter key={idx} letter={letter} />)}
        <div id="demo"> </div>
        <p> timer {this.state.time} </p>
        <button onClick={this.timer}>timer</button>
      </div>
    );
  }
}

export default Game;
