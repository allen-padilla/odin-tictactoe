const GameBoard = (() => {
    //let board = Array(9);
    let board = ['X','X','O','','','','','',''];

    return {
        board
    };
})();

const Player = (choice) => {
    const getChoice = () => choice;
    const selectChoice = () => {

    }
}

const displayBoard = () => {
    let board = GameBoard.board;
    let display = document.createElement('div');
    display.setAttribute('class', 'display');

    for(let i = 0; i < board.length; i++){
        let displayBox = document.createElement('div');
        displayBox.setAttribute('class', 'box');

        let fillSpot = document.createElement('p');
        fillSpot.textContent = board[i];

        displayBox.appendChild(fillSpot);
        display.appendChild(displayBox);
    }

    document.getElementsByClassName('display')[0].innerHTML = display.innerHTML
    console.log(board);
}

document.getElementById('btn-one-player').addEventListener('click', () => {
    displayBoard();
})

document.getElementById('btn-two-players').addEventListener('click', () => {
    console.log('Player One & Two')
})