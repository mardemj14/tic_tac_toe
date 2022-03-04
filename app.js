'use strict';
const roundEl = document.getElementById('round');
const maxRoundEl = document.getElementById('max-round');
const playerXEl = document.querySelector('.player-x');
const playerOEl = document.querySelector('.player-o');
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

    if (activePlayer === playerX) {
      playerXEl.classList.add('active-player');
      playerOEl.classList.remove('active-player');
    }

    if (activePlayer === playerO) {
      playerOEl.classList.add('active-player');
      playerXEl.classList.remove('active-player');
    }
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
        round++;

        squares[f].classList.add('win-anim');
        squares[s].classList.add('win-anim');
        squares[t].classList.add('win-anim');

        // reset round after 2 seconds
        setTimeout(() => {
          squares[f].classList.remove('win-anim');
          squares[s].classList.remove('win-anim');
          squares[t].classList.remove('win-anim');
          reset();
        }, 2000);
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
      round++;

      reset();
    }
  };

  const reset = () => {
    squares.forEach((square) => {
      square.textContent = '';
    });
  };

  const gameOver = () => {
    if (round > maxRounds) {
      scoreOEl.textContent = 'Score 0';
      scoreXEl.textContent = 'Score 0';
      round = 0;
      reset();
    }
  };

  return { squares, switchPlayer, activePlayer, checkWin, checkDraw, getRound, gameOver };
})();

const DisplayController = (() => {
  const updateSquareOnClick = (squares, player) => {
    squares.forEach((square) => {
      square.addEventListener('click', () => {
        // check if square is vacant before updating
        if (square.textContent === '') {
          square.textContent = player.sign;
        }

        // check for round win / draw
        GameBoard.checkWin();
        GameBoard.checkDraw();

        // update player score
        if (player.sign === 'X') scoreXEl.textContent = `Score ${player.score}`;
        else scoreOEl.textContent = `Score ${player.score}`;

        // switch active player after each turn
        player = GameBoard.switchPlayer();

        GameBoard.gameOver();

        // update current round
        roundEl.textContent = GameBoard.getRound();
      });
    });
  };

  return { updateSquareOnClick };
})();

DisplayController.updateSquareOnClick(GameBoard.squares, GameBoard.activePlayer);
