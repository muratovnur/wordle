import React from 'react'

export default function Row({ guess, currentGuess }) {
  if (guess) {
    return (
      <div className='row past'>
        {guess.map((letter, i) => {
          return <div className={`row__box ${letter.color}`} key={i}>{letter.key}</div>
        })}
      </div>
    )
  }
  if (currentGuess) {
    let letters = currentGuess.split('');
    return (
      <div className='row current'>
        {letters.map((letter, i) => {
          return <div className={`row__box filled`} key={i}>{letter}</div>;
        })}
        {[...Array(5 - letters.length)].map(( _, i ) => {
          return <div className='row__box' key={i}></div>;
        })}
      </div>
    )
  }
  return (
    <div className='row'>
      <div className='row__box'></div>
      <div className='row__box'></div>
      <div className='row__box'></div>
      <div className='row__box'></div>
      <div className='row__box'></div>
    </div>
  )
}
