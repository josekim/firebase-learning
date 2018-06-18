import React, { Component } from 'react';
import Letter from './Letter';
import TypingField from './TypingField';
import ScoreBoard from './ScoreBoard';

class Player extends Component {
  state = { gameID: this.props.match.params.ID, player: this.props.match.params.player, board: '', time: 0 };

  update = snapshot => {
    const gameState = snapshot.val();
    this.setState(snapshot.val());
  };

  componentDidMount = () => {
    this.props.database.ref(this.state.gameID).on('value', this.update);
  };
  notIncluded = word => !this.state.solution[word] && this.state.solution[word] !== undefined;

  handleOnSubmit = word => {
    if (this.notIncluded(word)) {
      let newSolution = this.state.solution;
      newSolution[word] = this.state.player;
      this.setState({ solution: newSolution }, () => this.props.database.ref(this.state.gameID).update({ solution: newSolution }));
    }
  };
  render() {
    return (
      <div>
        {this.state.board.split('').map((letter, idx) => <Letter key={idx} letter={letter} />)}
        <p> timer {this.state.time} </p>
        <TypingField handleOnSubmit={this.handleOnSubmit} board={this.state.board} />
        <ScoreBoard gameBoard={this.state.solution} time={this.state.time} />
      </div>
    );
  }
}

export default Player;
