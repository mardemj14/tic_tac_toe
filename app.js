'use strict';

const Player = (sign) => {
  this.sign = sign;

  return { sign };
};

const GameBoard = (() => {
  const squares = Array.from(document.querySelectorAll('.square'));

  return { squares };
})();

const DisplayController = (() => {
  const updateSquareOnClick = (squares, player) => {
    squares.forEach((square) => {
      square.addEventListener('click', () => {
        // check if square is vacant before updating
        if (square.textContent === '') square.textContent = player.sign;
        else console.log('Square is occupied');
      });
    });
  };

  const renderPage = (gameboard) => {
    gameboard.forEach((square) => {
      square.textContent = 'X';
    });
  };

  return { renderPage, updateSquareOnClick };
})();

const playerX = Player('X');

DisplayController.updateSquareOnClick(GameBoard.squares, playerX);
