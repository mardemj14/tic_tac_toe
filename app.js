'use strict';

const Player = (sign) => {
  this.sign = sign;

  return { sign };
};

const GameBoard = (() => {
  const playerX = Player('X');
  const playerO = Player('O');

  let activePlayer = playerX;
  let roundWin = false;

  const squares = Array.from(document.querySelectorAll('.square'));
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const switchPlayer = () => {
    activePlayer = activePlayer === playerX ? playerO : playerX;
    return activePlayer;
  };

  const checkWin = () => {
    winConditions.forEach((condition) => {
      // first, second and third index
      const [f, s, t] = condition;

      if (
        squares[f].textContent === squares[s].textContent &&
        squares[s].textContent === squares[t].textContent &&
        squares[f].textContent !== ''
      ) {
        roundWin = true;
        console.log(`${activePlayer.sign} Won!`);
      }
    });
  };

  return { squares, switchPlayer, activePlayer, checkWin };
})();

const DisplayController = (() => {
  const updateSquareOnClick = (squares, player) => {
    squares.forEach((square) => {
      square.addEventListener('click', () => {
        // check if square is vacant before updating
        if (square.textContent === '') {
          square.textContent = player.sign;
        } else console.log('Square is occupied');

        // check for round win / draw
        GameBoard.checkWin();

        // switch active player after each turn
        player = GameBoard.switchPlayer();
      });
    });
  };

  return { updateSquareOnClick };
})();

DisplayController.updateSquareOnClick(GameBoard.squares, GameBoard.activePlayer);
