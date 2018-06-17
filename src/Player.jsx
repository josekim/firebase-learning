import React, { Component } from 'react';
import Letter from './Letter';

class Player extends Component {
  state = { gameID: this.props.match.params.ID, player: this.props.match.params.player, board: '', time: 0 };

  update = snapshot => {
    const gameState = snapshot.val();
    console.log(snapshot.val());
    this.setState(snapshot.val());
  };

  componentDidMount = () => {
    this.props.database.ref(this.state.gameID).on('value', this.update);
  };

  render() {
    return (
      <div>
        {this.state.board.split('').map((letter, idx) => <Letter key={idx} letter={letter} />)}
        <p> timer {this.state.time} </p>
      </div>
    );
  }
}

export default Player;
