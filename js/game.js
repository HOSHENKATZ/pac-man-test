'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const CHERRY = '🍒'
const SUPERFOOD = '●'
const EMPTY = ' '


var gCherryInterval

const gGame = {
    score: 0,
    isOn: false
}
var gBoard

function init() {

    clearInterval(gCherryInterval)
    clearInterval(gGhostsInterval)
    console.log('hello')
    hideGameOverModal()
    hideWinModal()
    // hideWinModal()
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard, '.board-container')
    var audio = new Audio('audio/PacMan theme.mp3');
			audio.play();
            
    insertSuperFood()
    
    gCherryInterval = setInterval(insertCherry, 10000)

    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    gGame.score += diff

    const elScore = document.querySelector('.score span')
    elScore.innerText = gGame.score
}
function checkWin() {
    var foodCounter = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === FOOD) {
                foodCounter++
            }
        }
    }
   
    return foodCounter
}
function win() {
    showWinModal()
    clearInterval(gCherryInterval)
    clearInterval(gGhostsInterval)

    gGame.isOn = false
}
function gameOver() {
    clearInterval(gCherryInterval)
    console.log('gCherryInterval:' + gCherryInterval);

    showGameOverModal()
    gGame.isOn = false
}

function showGameOverModal() {
    var modal = document.querySelector('.game-over-modal')
    modal.style.display = 'block'
}
function hideGameOverModal() {
    var modal = document.querySelector('.game-over-modal')
    modal.style.display = 'none'
}
function showWinModal() {
    var modal = document.querySelector('.win-modal')
    modal.style.display = 'block'
}
function hideWinModal() {
    var modal = document.querySelector('.win-modal')
    modal.style.display = 'none'
}

function insertCherry() {

    var pos = findEmptyPos()

    gBoard[pos.i][pos.j] = CHERRY

    renderCell(pos, CHERRY)

}
function insertSuperFood() {
    var poses = [
        { i: 1, j: 1 },
        { i: 1, j: 8 },
        { i: 8, j: 1 },
        { i: 8, j: 8 }
    ]
    for (var i = 0; i < poses.length; i++) {

        var pos = poses[i]
        gBoard[pos.i][pos.j] = SUPERFOOD
        renderCell(pos, SUPERFOOD)
        
    }
}