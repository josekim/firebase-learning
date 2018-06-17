import React, { Component } from 'react';
import Letter from './Letter';

class Player extends Component {
  state = { gameID: this.props.match.params.ID, player: this.props.match.params.player, board: '' };

  update = snapshot => {
    const gameState = snapshot.val();
    console.log(snapshot.val());
  };

  componentDidMount = () => {
    this.props.database.ref(this.state.gameID).on('value', this.update);
  };

  render() {
    console.log('player');
    console.log(this.state.gameID);
    this.props.database.ref(this.state.gameID).set({ hello: 'world' });
    return <div>{this.state.board.split('').map((letter, idx) => <Letter key={idx} letter={letter} />)}</div>;
  }
}

export default Player;
