import { tetromino } from './tetromino.js'
import { grid } from './grid.js'

const moving = 500; // whole loop
const newGameBtn = document.querySelector('#new-game-button');
const pauseGameBtn = document.querySelector('#pause-game-button');
const timerHTML = document.querySelector('#timer');

let half = moving / 2, live, seconds;
let timer, requestId, start,
    checkRemove, gameOver, pause;

document.addEventListener('DOMContentLoaded', () => {
    grid.make();
    grid.makeMini();
    pauseGameBtn.style.display = 'none';

    function reset() {
        newGameBtn.style.display = 'none';
        pauseGameBtn.textContent = 'Pause'
        pauseGameBtn.style.display = '';
        live = 5, seconds = 0;
        requestId = undefined, start = undefined;
        checkRemove = false, gameOver = false, pause = false;
        grid.clear();
        tetromino.reNew(grid, tetromino.setRandom());
        start = Date.now();
        timer = setInterval(timerForGame, 1000);
        timerForGame();
    }

    function timerForGame() {
        if (live === undefined) {
            return;
        }
        if (seconds === 0) {
            live--;
            seconds = 60;
        }
        if (live < 0) {
            timerHTML.innerHTML = '00:00';
            gameOver = true;
            return;
        }
        if (pause) {
            return
        }
        let m;
        if (live < 0) {
            m = '00';
        } else {
            m = '0' + String(live);
        }
        let s;
        if (seconds < 10) {
            s = '0' + String(seconds);
        } else {
            s = String(seconds);
        }
        timerHTML.innerHTML = m + ':' + s;
        seconds--;
    }

    function gameOverFunc() {
        if (grid.isBusy(tetromino.current) || live < 0) {
            clearInterval(timer);
            tetromino.moveUp(grid);
            newGameBtn.style.display = '';
            pauseGameBtn.style.display = 'none';
            tetromino.gameOver(grid); // draw gameover text
            return true;
        }
        return false;
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
        } else {
            gameOverFunc();
        }
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
            pauseGameBtn.textContent = 'Continue';
            newGameBtn.style.display = '';
            clearInterval(timer);
            window.cancelAnimationFrame(requestId);
            requestId = undefined;
            pause = true;
        } else {
            newGameBtn.style.display = 'none';
            pauseGameBtn.textContent = 'Pause';
            pause = false;
            start = Date.now();
            timer = setInterval(timerForGame, 1000);
            requestId = window.requestAnimationFrame(gameLoop);
        }
    })

    newGameBtn.addEventListener('click', () => {
        reset();
        requestId = window.requestAnimationFrame(gameLoop);
    })
})

