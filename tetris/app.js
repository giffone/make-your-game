import { tetromino } from './tetromino.js'
import { grid } from './grid.js'

const startBtn = document.querySelector('#start-button');
const newGameBtn = document.querySelector('#clear-button');

document.addEventListener('DOMContentLoaded', () => {
    newGameBtn.disabled = true;
    grid.make();
    grid.makeMini();
    tetromino.reNew(grid, tetromino.setRandom());

    let moving = 500; // whole loop
    let half = moving / 2;
    let requestId, start;
    let checkRemove, gameOver = false;

    function gameLoop() {
        let timePassed = Date.now() - start;
        // draw tetromino (next tetromino) on board
        tetromino.draw(grid)
        if (checkRemove && timePassed >= half) {
            // remove
            checkRemove = !grid.remove();
            // make new tetromino
            tetromino.reNew(grid,tetromino.next.getProperties());
            // check game over
            if (grid.isBusy(tetromino.current)) {
                console.log('game over')
                gameOver = true;
            }
        }
        if (timePassed >= moving) {
            move();
        }
        if (gameOver) {
            startBtn.disabled = true;
        } else {
            requestId = window.requestAnimationFrame(gameLoop);
        }
    }

    function move() {
        // if after bingo line not removed, exit
        if (checkRemove) {
            return;
        }
        // try to freeze tetromino, if it at the bottom or on another tetromino
        if (tetromino.freeze(grid)) {
            if (grid.bingo()) {
                checkRemove = true;
                start = Date.now();
            } else {
                tetromino.reNew(grid,tetromino.next.getProperties());
                // check game over
                if (grid.isBusy(tetromino.current)) {
                    console.log('game over2')
                    gameOver = true;
                    newGameBtn.disabled = false;
                } else {
                    start = Date.now();
                }
            }
        } else {
            tetromino.moveDown(grid);
            start = Date.now();
        }
    }

    document.addEventListener('keydown', e => {
        if (gameOver) {
            return;
        }
        if (e.key === 'ArrowLeft') {
            tetromino.moveLeft(grid);
        } else if (e.key === 'ArrowRight') {
            tetromino.moveRight(grid);
        } else if (e.key === 'ArrowDown') {
            move();
        }
    })

    document.addEventListener('keyup', e => {
        if (gameOver) {
            return;
        }
        if (e.key === 'ArrowUp') {
            tetromino.rotate(grid);
        }
    })

    startBtn.addEventListener('click', () => {
        if (requestId) {
            console.log('strbtn in cancel, id is', requestId);
            window.cancelAnimationFrame(requestId);
            requestId = undefined;
            newGameBtn.disabled = false;
        } else {
            console.log('strbtn in start, id is', requestId);
            newGameBtn.disabled = true;
            start = Date.now()
            requestId = window.requestAnimationFrame(gameLoop);
        }
    })

    newGameBtn.addEventListener('click', () => {
        console.log('newgame btn in cancel, id is (bef)', requestId);
        requestId = undefined;
        start = undefined;
        checkRemove = false;
        gameOver = false;
        grid.clear();
        tetromino.reNew(grid, tetromino.setRandom());
        startBtn.disabled = false;
        console.log('newgame btn in cancel, id is (aft)', requestId);
    })
})

