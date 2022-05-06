import { tetromino } from './tetromino.js'
import { grid } from './grid.js'

const startBtn = document.querySelector('#start-button');
const newGameBtn = document.querySelector('#clear-button');

document.addEventListener('DOMContentLoaded', () => {
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
                } else {
                    start = Date.now();
                }
            }
        } else {
            tetromino.moveDown(grid);
            start = Date.now();
        }
    }

    document.addEventListener('keyup', e => {
        if (e.key === 'ArrowLeft') {
            tetromino.moveLeft(grid);
        } else if (e.key === 'ArrowRight') {
            tetromino.moveRight(grid);
        } else if (e.key === 'ArrowUp') {
            tetromino.rotate(grid);
        } else if (e.key === 'ArrowDown') {
            console.log('keyup');
            move();
        }
    })

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') {
            tetromino.moveLeft(grid);
        } else if (e.key === 'ArrowRight') {
            tetromino.moveRight(grid);
        } else if (e.key === 'ArrowUp') {
            tetromino.rotate(grid);
        } else if (e.key === 'ArrowDown') {
            console.log('keydown');
            move();
        }
    })

    document.addEventListener('keypress', e => {
        if (e.key === 'ArrowLeft') {
            tetromino.moveLeft(grid);
        } else if (e.key === 'ArrowRight') {
            tetromino.moveRight(grid);
        } else if (e.key === 'ArrowUp') {
            tetromino.rotate(grid);
        } else if (e.key === 'ArrowDown') {
            console.log('keypress');
            move();
        }
    })

    startBtn.addEventListener('click', () => {
        if (requestId) {
            window.cancelAnimationFrame(requestId);
            requestId = undefined;
        } else {
            start = Date.now()
            requestId = window.requestAnimationFrame(gameLoop);
        }
    })

    newGameBtn.addEventListener('click', () => {
        requestId = undefined;
        start = undefined;
        checkRemove = false;
        gameOver = false;
        grid.clear();
        tetromino.reNew(grid, tetromino.setRandom());
        startBtn.disabled = false;
    })
})