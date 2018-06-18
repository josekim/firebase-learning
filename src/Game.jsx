import React, { Component } from 'react';
import getUniquePermutations from 'get-unique-permutations';
import Letter from './Letter';
import TypingField from './TypingField';
import ScoreBoard from './ScoreBoard';

class Game extends Component {
  state = { gameID: this.props.match.params.ID, board: '', time: 0, words: [], solution: {} };

  componentDidMount = () => {
    const board = 'LetsPlay';
    this.setState({ board });
    this.props.database.ref(this.state.gameID).set({ time: 0, board });

    this.props.database.ref(this.state.gameID).on('value', this.update);
  };

  update = snapshot => {
    const gameState = snapshot.val();
    this.setState(snapshot.val());
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
    this.props.database.ref(this.state.gameID).update({ time: this.state.time });
  };

  timer = () => {
    // Update the count down every 1 second
    if (!this.state.timer) {
      const board = this.createRandomLetters();
      this.setState({ board });
      // Wasn't able to find a api to hit, so i'm just coming up with some fake words here
      const solution = this.getSolution(board);
      const timer = setInterval(this.updateTimer, 1000);
      this.props.database.ref(this.state.gameID).set({ time: 60, solution, board });

      this.setState({ time: 60, board }, () => {
        this.setState({ timer });
      });
    }
  };

  getSolution = board => {
    let solution = getUniquePermutations(board.slice(2, 6).split(''));
    solution = solution.map(word => word.join(''));
    let objectSolution = {};
    for (let idx = 0; idx < solution.length; idx++) {
      objectSolution[solution[idx]] = '';
    }
    return objectSolution;
  };

  notIncluded = word => !this.state.solution[word] && this.state.solution[word] !== undefined;

  handleOnSubmit = word => {
    if (this.notIncluded(word)) {
      let newSolution = this.state.solution;
      newSolution[word] = 'host';
      this.setState({ solution: newSolution }, () => this.props.database.ref(this.state.gameID).update({ solution: newSolution }));
    }
  };

  render() {
    return (
      <div>
        {this.state.board.split('').map((letter, idx) => <Letter key={idx} letter={letter} />)}
        <div id="demo"> </div>
        <p> timer {this.state.time} </p>
        <button onClick={this.timer}>Start Game</button>
        <TypingField handleOnSubmit={this.handleOnSubmit} board={this.state.board} />
        <ScoreBoard gameBoard={this.state.solution} time={this.state.time} />
      </div>
    );
  }
}

export default Game;
