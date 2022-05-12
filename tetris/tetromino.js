export { tetromino }
import { bingoColor } from './grid.js'

const jTetromino = {
    body: [
        [1, 2, 11, 21],
        [10, 11, 12, 22],
        [1, 11, 20, 21],
        [10, 20, 21, 22]
    ],
    mini : [
        [1, 2, 5, 9],
        [4, 5, 6, 10],
        [1, 5, 8, 9],
        [4, 8, 9, 10]
    ],
    width : 3,
    left : [1, 0, 0, 0], // need to +/- to correct position
    right : [0, 0, -1, 0]
}

const lTetromino = {
    body : [
        [0, 1, 11, 21],
        [2, 10, 11, 12],
        [1, 11, 21, 22],
        [10, 11, 12, 20]
    ],
    mini : [
        [0, 1, 5, 9],
        [2, 4, 5, 6],
        [1, 5, 9, 10],
        [4, 5, 6, 8]
    ],
    width : 3,
    left : [0, 0, 1, 0], // need to +/- to correct position
    right : [-1, 0, 0, 0]
}

const sTetromino = {
    body : [
        [1, 2, 10, 11],
        [1, 11, 12, 22],
        [11, 12, 20, 21],
        [0, 10, 11, 21]
    ],
    mini : [
        [1, 2, 4, 5],
        [1, 5, 6, 10],
        [5, 6, 8, 9],
        [0, 4, 5, 9]
    ],
    width : 3,
    left : [0, 1, 0, 0], // need to +/- to correct position
    right : [0, 0, 0, -1]
}

const zTetromino = {
    body : [
        [0, 1, 11, 12],
        [2, 11, 12, 21],
        [10, 11, 21, 22],
        [1, 10, 11, 20]
    ],
    mini : [
        [0, 1, 5, 6],
        [2, 5, 6, 9],
        [4, 5, 9, 10],
        [1, 4, 5, 8]
    ],
    width : 3,
    left : [0, 1, 0, 0], // need to +/- to correct position
    right : [0, 0, 0, -1]
}

const tTetromino = {
    body : [
        [1, 10, 11, 12],
        [1, 11, 12, 21],
        [10, 11, 12, 21],
        [1, 10, 11, 21]
    ],
    mini : [
        [1, 4, 5, 6],
        [1, 5, 6, 9],
        [4, 5, 6, 9],
        [1, 4, 5, 9]
    ],
    width : 3,
    left : [0, 1, 0, 0], // need to +/- to correct position
    right : [0, 0, 0, -1]
}

const oTetromino = {
    body : [
        [0, 1, 10, 11],
        [0, 1, 10, 11],
        [0, 1, 10, 11],
        [0, 1, 10, 11]
    ],
    mini : [
        [0, 1, 4, 5],
        [0, 1, 4, 5],
        [0, 1, 4, 5],
        [0, 1, 4, 5]
    ],
    width: 3,
    left : [0, 0, 0, 0], // need to +/- to correct position
    right : [-1, -1, -1, -1]
}

const iTetromino = {
    body : [
        [1, 11, 21, 31],
        [10, 11, 12, 13],
        [2, 12, 22, 32],
        [20, 21, 22, 23]
    ],
    mini : [
        [1, 5, 9, 13],
        [4, 5, 6, 7],
        [2, 6, 10, 14],
        [8, 9, 10, 11]
    ],
    width : 4,
    left : [1, 0, 2, 0], // need to +/- to correct position
    right : [-2, 0, -1, 0]
}

const gameOverTetromino = [
    1, 2, 3, 4, 7,
    11, 16, 18,
    21, 23, 24, 26, 27, 28,
    31, 32, 33, 36, 38,

    51, 52, 54, 55, 57, 58, 59,
    61, 63, 65, 67,
    71, 73, 75, 77, 78,
    81, 85, 87, 88, 89,

    111, 112, 113, 116, 118,
    121, 123, 126, 128,
    131, 133, 136, 138,
    141, 142, 143, 147,

    161, 162, 163, 166, 167, 168,
    171, 176, 178,
    181, 182, 186, 187,
    191, 192, 193, 196, 198
]

// all tetrominoes
const theTetrominoes = [
    jTetromino, lTetromino, sTetromino,
    zTetromino, tTetromino, oTetromino, iTetromino
];

const defaultPositionInGrid = 4;

const colors = [
    '#00B2CA',
    '#0C8346',
    '#33658A',
    '#665687',
    '#D64550',
    '#FFB20F',
    '#FFE548',
    '#06B2A7',
    '#446DF6', 
    '#FE4A49', 
    '#EA638C',
    '#FF85DE',
    '#9410D1',
];

// current tetromino in game
let makeTetromino = function ([random,  rotation, color, position]) {
    return {
        kind : random,
        rotation : rotation,
        position : position,
        color : color,
        body : theTetrominoes[random]['body'][rotation],
        coordinateX : function () {
            if (typeof theTetrominoes[random]['width'] === 'number') {
                return  defaultPositionInGrid + Math.floor(theTetrominoes[random]['width'] / 2);
            }
            return defaultPositionInGrid;
        }(),
        // choose rotated tetromino by index
        makeRotation : function (rotateNow) {
            if (rotateNow !== undefined) {
                this.rotation = rotateNow;
            }
            this.body = theTetrominoes[this.kind]['body'][this.rotation];
        },
        // return indexes of current tetromino
        getProperties : function () {
            return [this.kind, this.rotation, this.color, this.position];
        },
        // return current position
        getSide : function (grid) {
            if (this.coordinateX < grid.halfW) {
                return 'left';
            } else {
                return 'right';
            }
        },
    }
}

// next tetromino in game
let makeMini = function ([random, rotation, color]) {
    return {
        kind : random,
        rotation : rotation,
        color : color,
        mini : theTetrominoes[random]['mini'][rotation],
        getProperties : function () {
            return [this.kind, this.rotation, this.color];
        },
    }
}

let tetromino = {
    // current tetromino in game
    current : {},
    // next tetromino in game
    next : {},
    // makes random index for tetromino shape
    setRandom : function () {
        let random = makeRandom(theTetrominoes.length);
        let rotation = makeRandom(theTetrominoes[0].body.length);
        let color = makeRandom(colors.length);
        return [random, rotation, color];
    },
    // resets the current settings of the tetromino
    reNew : function (grid, [random, rotation, color]) {
        this.clear(grid, true);
        this.current = makeTetromino([random, rotation, color, defaultPositionInGrid]);
        // make new random for next tetromino
        this.next = makeMini(this.setRandom());
        this.draw(grid, true);
    },
    // adds tetromino or next tetromino to the grid
    draw : function (grid, mini = false) {
        if (mini) {
            // draw mini
            this.next.mini.forEach(index => {
                let n = grid.miniSchema[index];
                if (this.next.color === undefined) {
                    n.style.backgroundColor = 'black';
                } else {
                    n.style.backgroundColor = colors[this.next.color];
                }
            })
        } else {
            // draw normal
            this.current.body.forEach(index => {
                let t = grid.schema[this.current.position + index];
                // do not redraw bingo-line
                if (t.classList.contains('bingo')) {
                    t.style.backgroundColor = bingoColor;
                    return;
                }
                if (this.current.color === undefined) {
                    t.style.backgroundColor = 'black';
                } else {
                    t.style.backgroundColor = colors[this.current.color];
                }
            })
        }
    },
    // removes tetromino from the grid
    clear : function (grid, mini = false) {
        if (mini) {
            if (this.next.mini === undefined) {
                return;
            }
            // clear mini
            this.next.mini.forEach(index => {
                grid.miniSchema[index].style.backgroundColor = '';
            })
        } else {
            // clear normal
            this.current.body.forEach(index => {
                grid.schema[this.current.position + index].style.backgroundColor = '';
            })
        }
    },
    // checks the current position of the tetromino
    // and freezes it if it is at the bottom or above another tetromino
    freeze : function (grid) {
        if (grid.isBottomOrIsBusy(this.current)) {
            // freeze tetromino
            this.current.body.forEach(index => {
                grid.schema[this.current.position + index].classList.add('frozen');
            });
            return true;
        }
        return false;
    },
    moveLeft : function(grid) {
        // copy position to view change after
        let bufPosition = this.current.position;
        this.clear(grid);
        // check movement inside grid
        if (!grid.onLeftEdge(this.current)) {
            this.current.position--; // move
        }
        // check neighbour cell for tetromino
        if (grid.isBusy(this.current)) {
            this.current.position++; // undo
        }
        // check change position or not
        if (bufPosition !== this.current.position) {
            this.current.coordinateX--;
        }
        this.draw(grid);
    },
    moveRight : function(grid) {
        // copy position to view change after
        let bufPosition = this.current.position;
        this.clear(grid);
        // check movement inside grid
        if (!grid.onRightEdge(this.current)) {
            this.current.position++; // move
        }
        // check new position for already staying tetromino
        if (grid.isBusy(this.current)) {
            this.current.position--; // undo
        }
        // check change position or not
        if (bufPosition !== this.current.position) {
            this.current.coordinateX++;
        }
        this.draw(grid);
    },
    moveDown : function(grid) {
        this.clear(grid);
        this.current.position += grid.width;
        this.draw(grid);
    },
    rotate : function (grid) {
        this.clear(grid);
        // copy current tetromino to buffer before change the current
        let bufTetromino = makeTetromino(this.current.getProperties());
        // save side before rotate
        let side = this.current.getSide(grid);
        // make rotation value
        this.current.rotation++;
        // if the current rotation gets 4, need change to default 0
        if (this.current.rotation === this.current.body.length) {
            this.current.rotation = 0;
        }
        // make new rotated tetromino
        this.current.makeRotation();
        // checks after rotation if the tetromino is on the other side
        if (side === 'left' && grid.onRightEdge(this.current)) {
            while (grid.onRightEdge(this.current)) {
                this.current.position++;
                this.current.coordinateX++;
            }
        } else if (side === 'right' && grid.onLeftEdge(this.current)) {
            while (grid.onLeftEdge(this.current)) {
                this.current.position--;
                this.current.coordinateX--;
            }
        }
        // check new position for bottom or already staying tetromino
        if (this.bottomOut(grid) || grid.isBusy(this.current)) {
            // undo changes
            this.current = bufTetromino;
        }
        this.draw(grid);
    },
    gameOver : function (grid) {
        this.current = {
            body : gameOverTetromino,
            position : 0
        };
        this.draw(grid);
    },
    // move tetromino up
    moveUp : function (grid) {
        this.current.body = this.moveUpCut();
        while (grid.isBusy(this.current)) {
            this.current.body = this.moveUpCut();
        }
        this.draw(grid);
    },
    // cut tetromino elements that indexes with minus (out of grid - up side)
    moveUpCut : function () {
        let buf = [];
        this.current.body.forEach(element => {
            let e = element - 10; // -10 means move up
            if (e >= 0) {
                buf = [...buf, e];
            }
        })
        return buf;
    },
    // checks if tetromino out of grid - down side (already stays)
    bottomOut : function (grid) {
        let width = (grid.width * grid.height) - 1;
        return this.current.body.some(index => index + this.current.position > width);
    }
}

function makeRandom(n) {
    return Math.floor(Math.random() * n);
}