const gameBoard = (() => {
  let board = Array(9);

  const placeMark = (num, mark) => {
    if (board[num] == undefined) {
      board[num] = mark;
    }

    console.log(checkWinner());
    displayController();
  }

  const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
      // Horizontal
      if (board[0 + (i * 3)] != undefined && board[0 + (i * 3)] == board[1 + (i * 3)] && board[0 + (i * 3)] == board[2 + (i * 3)]) {
        return true;
      }

      // Vertical
      if (board[0 + i] != undefined && board[0 + i] == board[3 + i] && board[0 + i] == board[6 + i]) {
        return true;
      }

      // Left Diagonal
      if (board[0] != undefined && board[0] == board[4] && board[0] == board[8]) {
        return true;
      }

      // Right Diagonal
      if (board[2] != undefined && board[2] == board[4] && board[2] == board[6]) {
        return true;
      }
    }
  }

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = undefined;
    }
  }

  return { board, placeMark, reset };
})();

const player = () => {
  let mark = "X";

  const changeTurn = () => {
    mark = "0";
  }

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
      gameBoard.placeMark(i, 'X');
    })
  }
}

(function start(params) {
  displayController();
})()

document.getElementById('btn-one-player').addEventListener('click', () => {
  gameBoard.reset();
  displayController();
})