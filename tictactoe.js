
const gameBoard = (() => {
  let board = Array(9);

  const placeMark = (num, mark) => {
    if (board[num] == undefined) {
      board[num] = mark;
      play.mark = play.mark == 'X' ? 'O' : 'X';
    }

    if (playerCount == 1 && play.mark == 'O') {
      ai.botMove();
    }

    displayController();

    if (checkWinner() != null) {
      let doc = document.createElement('div');
      doc.setAttribute('class', 'result')
      if (checkWinner()[0] == 'Winner')
        doc.textContent = `${checkWinner()[1] == 'X' ? 'Player 1' : 'Player 2'} is the ${checkWinner()[0]}`;
      else
        doc.textContent = `Tie!`;

      setTimeout(() => {
        document.getElementsByClassName('display')[0].innerHTML = doc.innerHTML;
      }, 300);
    }
  }

  const checkWinner = () => {
    let moves = 0;
    for (let i = 0; i < 8; i++) {
      if (board[i] != undefined) {
        moves++;
      }
    }

    if (moves == board.length) {
      return ['Tie'];
    }

    for (let i = 0; i < 3; i++) {
      // Horizontal
      if (board[0 + (i * 3)] != undefined && board[0 + (i * 3)] == board[1 + (i * 3)] && board[0 + (i * 3)] == board[2 + (i * 3)]) {
        return ['Winner', board[0 + (i * 3)]];
      }

      // Vertical
      if (board[0 + i] != undefined && board[0 + i] == board[3 + i] && board[0 + i] == board[6 + i]) {
        return ['Winner', board[0 + i]];
      }

      // Left Diagonal
      if (board[0] != undefined && board[0] == board[4] && board[0] == board[8]) {
        return ['Winner', board[4]];
      }

      // Right Diagonal
      if (board[2] != undefined && board[2] == board[4] && board[2] == board[6]) {
        return ['Winner', board[4]];
      }
    }
  }

  const reset = () => {
    play = player('X');

    for (let i = 0; i < board.length; i++) {
      board[i] = undefined;
    }
  }

  return { board, placeMark, checkWinner, reset };
})();

const ai = (() => {
  const botMove = () => {
    let legalMoves = Array();
    for (let i = 0; i < gameBoard.board.length; i++) {
      if (gameBoard.board[i] === undefined) {
        legalMoves.push(i)
      }
    }

    if (gameBoard.checkWinner() == null) {
      setTimeout(() => {
        gameBoard.placeMark(legalMoves[Math.floor(Math.random() * legalMoves.length)], play.mark);
      }, 300);
    }
  }

  return { botMove }
})()

const player = (mark) => {
  const changeTurn = () => {
  };

  return { mark, changeTurn }
}

const displayController = () => {
  let display = document.createElement('div');

  for (let i = 0; i < gameBoard.board.length; i++) {
    let box = document.createElement('div');
    box.setAttribute('class', 'box');

    let mark = document.createElement('p');
    mark.textContent = gameBoard.board[i];

    box.appendChild(mark);
    display.appendChild(box);
  }

  document.getElementsByClassName('display')[0].innerHTML = display.innerHTML;
  let boxes = document.getElementsByClassName('box');

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', () => {
      gameBoard.placeMark(i, play.mark);
    })
  }
}

let play = player('X');
let playerCount = 1;

(function start(params) {
  displayController();
})()

document.getElementById('btn-one-player').addEventListener('click', () => {
  playerCount = 1;
  gameBoard.reset();
  displayController();
})

document.getElementById('btn-two-players').addEventListener('click', () => {
  playerCount = 2;
  gameBoard.reset();
  displayController();
})