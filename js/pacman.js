'use strict'

const PACMAN = '😜'
var gPacman
var SUPER = false


function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: { i: 5, j: 5 },
        isSuper: false,
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return

    // TODO: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL) return

    if (nextCell === SUPERFOOD) {
        SUPER = true

        setTimeout(() => {
            SUPER = false


        }, 5000);

    }
    // if (isWin) return
    // TODO: hitting a ghost? call gameOver
    if (!SUPER && nextCell === GHOST) {
        gameOver()
        return
    }

    if (SUPER && nextCell === GHOST) {
        var eatenGhosts = deleteGhost(nextCell)
        console.log(eatenGhosts)
        console.log(gGhosts)
         setTimeout(returnGhost,5000,eatenGhosts)
         


    }


    // TODO: hitting food? call updateScore
    if (nextCell === FOOD) updateScore(1)

    if (nextCell === CHERRY) updateScore(10)


    // TODO: moving from current location:
    // TODO: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // TODO: update the DOM
    renderCell(gPacman.location, EMPTY)

    var foodCount = checkWin()
    if (foodCount === 0) win()
    // TODO: Move the pacman to new location:
    // TODO: update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // TODO: update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j,
    }
    // TODO: figure out nextLocation
    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;

        default:
            return null;
    }
    return nextLocation
}

function deleteGhost(loc) {
    var ghosts = []
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === loc.i && gGhosts[i].location.j === loc.j)
            console.log(ghosts[i])
        var currGhost = gGhosts.splice(i,1)[0]
        
        ghosts.push(currGhost)
    }
    return ghosts
}
function returnGhost(ghosts) {
    console.log(ghosts)
    for (var i = 0; i < ghosts.length; i++) {
        gGhosts.push(ghosts[i])
        
    }

}