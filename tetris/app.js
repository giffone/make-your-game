import { tetromino } from './tetromino.js'
import { grid } from './grid.js'

const newGameBtn = document.querySelector('#new-game-button');
const pauseGameBtn = document.querySelector('#pause-game-button');

document.addEventListener('DOMContentLoaded', () => {
    grid.make();
    grid.makeMini();
    pauseGameBtn.style.display = 'none';

    let moving = 500; // whole loop
    let half = moving / 2;
    let requestId, start;
    let checkRemove, gameOver, pause = false;

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
            gameOver = gameOverFunc();
        }
        if (timePassed >= moving) {
            move();
        }
        if (!gameOver) {
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
                gameOver = gameOverFunc();
                if (!gameOver) {
                    start = Date.now();
                }
            }
        } else {
            tetromino.moveDown(grid);
            start = Date.now();
        }
    }

    function gameOverFunc() {
        if (grid.isBusy(tetromino.current)) {
            tetromino.moveUp(grid);
            newGameBtn.style.display = '';
            pauseGameBtn.style.display = 'none';
            tetromino.gameOver(grid);
            return true;
        }
        return false;
    }

    document.addEventListener('keydown', e => {
        if (gameOver || pause) {
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
        if (gameOver || pause) {
            return;
        }
        if (e.key === 'ArrowUp') {
            tetromino.rotate(grid);
        }
    })

    pauseGameBtn.addEventListener('click', () => {
        if (requestId) {
            pauseGameBtn.textContent = 'Continue'
            newGameBtn.style.display = '';
            window.cancelAnimationFrame(requestId);
            requestId = undefined;
            pause = true;
        } else {
            newGameBtn.style.display = 'none';
            pauseGameBtn.textContent = 'Pause'
            pause = false;
            start = Date.now()
            requestId = window.requestAnimationFrame(gameLoop);
        }
    })

    newGameBtn.addEventListener('click', () => {
        newGameBtn.style.display = 'none';
        pauseGameBtn.textContent = 'Pause'
        pauseGameBtn.style.display = '';
        requestId = undefined;
        start = undefined;
        checkRemove = false;
        gameOver = false;
        pause = false;
        grid.clear();
        tetromino.reNew(grid, tetromino.setRandom());
        start = Date.now()
        requestId = window.requestAnimationFrame(gameLoop);
    })
})

