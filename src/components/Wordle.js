import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';

export default function Wordle({ solution }) {
  const {currentGuess, guesses, turn, isCorrect, handleKeyup} = useWordle(solution);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup]);

  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);

  return (
    <>
      <div>Solution is: {solution}</div>
      <div>Current guess is: {currentGuess}</div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
    </>
    )
}
