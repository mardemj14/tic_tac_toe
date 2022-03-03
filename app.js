'use strict';
const roundEl = document.getElementById('round');
const maxRoundEl = document.getElementById('max-round');
let scoreXEl = document.querySelector('.score-x');
let scoreOEl = document.querySelector('.score-o');

const Player = (sign) => {
  this.sign = sign;
  this.score = 0;

  return { sign, score };
};

const GameBoard = (() => {
  const playerX = Player('X');
  const playerO = Player('O');

  let activePlayer = playerX;
  let roundWin = false;
  let roundDraw = false;
  let round = 1;
  const maxRounds = 5;

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

  const getRound = () => {
    return round;
  };

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
        activePlayer.score++;
        console.log(`${activePlayer.sign} won round ${round}/${maxRounds}`);
        round++;

        // add reset round logic
      }
    });
  };

  const checkDraw = () => {
    // vacant is recognize as '' (an empty string)
    let vacantSquares = 9;

    squares.forEach((square) => {
      if (square.textContent !== '') vacantSquares--;
    });

    if (!roundWin && vacantSquares <= 0) {
      roundDraw = true;
      console.log('Round draw');
      round++;
    }
  };

  return { squares, switchPlayer, activePlayer, checkWin, checkDraw, getRound };
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
        GameBoard.checkDraw();

        // update current round
        roundEl.textContent = GameBoard.getRound();

        // update player score
        if (player.sign === 'X') scoreXEl.textContent = `Score ${player.score}`;
        else scoreOEl.textContent = `Score ${player.score}`;

        // switch active player after each turn
        player = GameBoard.switchPlayer();
      });
    });
  };

  return { updateSquareOnClick };
})();

DisplayController.updateSquareOnClick(GameBoard.squares, GameBoard.activePlayer);
