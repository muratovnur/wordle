import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  
  const formatGuess = () => {
    const solutionArray = [...solution];
    const formattedGuess = [...currentGuess].map((letter) => {
      return {key: letter, color: 'grey'};
    })
    formattedGuess.forEach((letter, i) => {
      if (solutionArray[i] === letter.key) {
        letter.color = 'green';
        solutionArray[i] = null;
      }
    })
    formattedGuess.forEach((letter, i) => {
      if (solutionArray.includes(letter.key) && letter.color !== 'green') {
        letter.color = 'yellow';
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    })

    return formattedGuess;
  }

  const addNewGuess = (formattedGuess) => {
    if (solution === currentGuess) {
      setIsCorrect(true);
    }
    setGuesses(prev => {
      const newGuesses = [...prev];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    })

    setHistory(prev => [...prev, currentGuess]);

    setTurn(prev => prev + 1);

    setCurrentGuess('');
  }

  const handleKeyup = ({ key }) => {
    if (key === 'Enter') {
      if (turn > 5) {
        console.log('You can not make guesses anymore');
        return;
      }
      if (history.includes(currentGuess)) {
        console.log('You already used that word');
        return;
      }
      if (currentGuess.length !== 5) {
        console.log('The word is too short');
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess(prev => prev + key);
      }
    }
  }

  return { turn, currentGuess, guesses, isCorrect, handleKeyup };
}

export default useWordle;