import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  const gameNumber = Math.floor(Math.random() * 1000);
  return (
    <div>
      <h2>Welcome to Fire Scramble</h2>
      <p>
        {' '}
        This is a Small project built on FireBase database from Google. Purpose of this Little project is build with Google's Firebase. This
        project is built in React Js.
      </p>

      <Link to={`/game/${gameNumber}`}>
        <p>Start a Game</p>{' '}
      </Link>

      <Link to={`/game/${gameNumber}/player2`}>
        <p> Link for your Friend</p>
      </Link>
    </div>
  );
};

export default Start;
