import { tetromino } from './tetromino.js'
import { grid } from './grid.js'

const scoreDisplay = document.querySelector('#score');
const startBtn = document.querySelector('#start-button');
const newGameBtn = document.querySelector('#clear-button');

document.addEventListener('DOMContentLoaded', () => {
    grid.make();
    grid.makeMini();
    tetromino.reNew(grid, tetromino.setRandom());
    console.log(tetromino.current)

    let timerId;

    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            tetromino.draw(grid)
            timerId = setInterval(() => {
                // if the current tetromino is already at the bottom of the grid,
                // then need freeze it and create a new one
                tetromino.freeze(grid)
                // then can move down
                tetromino.moveDown(grid)
            },500)
        }
    })

    newGameBtn.addEventListener('click', () => {
        grid.clear(tetromino, tetromino.setRandom())
    })

    document.addEventListener('keyup', e => {
        if (e.key === 'ArrowLeft') {
            tetromino.moveLeft(grid)
        } else if (e.key === 'ArrowRight') {
            tetromino.moveRight(grid)
        } else if (e.key === 'ArrowUp') {
            tetromino.rotate(grid)
        } else if (e.key === 'ArrowDown') {
            tetromino.freeze(grid)
            tetromino.moveDown(grid)
        }
    })
})