const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageTextElement = document.querySelector('[data-winning-msg-text]')
const winningMsgElement = document.getElementById('winningMsg')
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let circleTurn

startGame()

function startGame() {
    circleTurn = false

    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true})
    })

    hoverWhoseTurn()
}


function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeClass(cell, currentClass)

    if(checkWin(currentClass)) {
        endGame(false)
    }

    swapTurns()
    hoverWhoseTurn()
}

function placeClass(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function hoverWhoseTurn() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)

    if(circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_CONDITIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if(draw) {

    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMsgElement.classList.add('show')
}