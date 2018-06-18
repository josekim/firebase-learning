import React from 'react';

const ScoreBoard = props => {
  const { gameBoard } = props;
  let solution = gameBoard || {};
  let players = {};
  let displayPlayers = [];
  let displayWord = [];
  if (!(Object.keys(solution).length === 0 && solution.constructor === Object)) {
    Object.keys(solution).forEach(key => {
      if (solution[key]) {
        displayWord.push(key);
        if (!displayPlayers.includes(solution[key])) {
          displayPlayers.push(solution[key]);
        }
        if (players[solution[key]]) {
          players[solution[key]] = players[solution[key]] + 1;
        } else {
          players[solution[key]] = 1;
        }
      }
    });
  }
  return (
    <div>
      <h2>Words Taken</h2>
      <p>{displayWord.join(' ')}</p>
      <h2>Player Scores</h2>
      <div>{displayPlayers.sort().map(name => <p key={name}>{`${name}: ${players[name]} `}</p>)}</div>
    </div>
  );
};

export default ScoreBoard;
