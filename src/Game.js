import React from "react";
import { useCustomStorageHook } from "./useCustomStorageHook";
import Board from "./Board";

const Game = () => {
  const [currentStep, setCurrentStep] = useCustomStorageHook("step", 0);
  const [history, setHistory] = useCustomStorageHook("game-history", [
    Array(9).fill(null),
  ]);

  const currentSquare = history[currentStep];
  const nextValue = calculateNextValue(currentSquare);
  const winner = calculateWinner(currentSquare);
  const status = calculateStatus(winner, currentSquare, nextValue);

  function calculateStatus(winner, squares, nextValue) {
    return winner
      ? `Winner: ${winner}`
      : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`;
  }

  function selectSquare(square) {
    if (winner || currentSquare[square]) return;

    const newHistory = history.slice(0, currentStep + 1);
    const squaresCopy = [...currentSquare];
    squaresCopy[square] = nextValue;
    setHistory([...newHistory, squaresCopy]);
    setCurrentStep(history.length);
  }

  const moves = history.map((currentBtn, step) => {
    const desc = step === 0 ? "Start new Game" : `Go to move #${step}`;
    const isCurrent = currentStep === step;

    return (
      <li key={step}>
        <button disabled={isCurrent} onClick={() => setCurrentStep(step)}>
          {desc} {isCurrent ? "(current)" : null}
        </button>
      </li>
    );
  });

  function restart() {
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquare} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );

  function calculateNextValue(square) {
    return square.filter(Boolean).length % 2 === 0 ? "X" : "O";
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
};

export default Game;
