export { tetromino }

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
    height : 3,
    move : ['left', '', 'right', ''], // need to move away from the edge before rotate
    correct : [1, 0, 1, 0] // need to +/- to correct position
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
    height : 3,
    move : ['right', '', 'left', ''], // need to move away from the edge before rotate
    correct : [1, 0, 1, 0] // need to +/- to correct position
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
    height : 3,
    move : ['', 'left', '', 'right'], // need to move away from the edge before rotate
    correct : [0, 1, 0, 1] // need to +/- to correct position
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
    height : 3,
    move : ['', 'left', '', 'right'], // need to move away from the edge before rotate
    correct : [0, 1, 0, 1] // need to +/- to correct position
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
    height : 3,
    move : ['', 'left', '', 'right'], // need to move away from the edge before rotate
    correct : [0, 1, 0, 1] // need to +/- to correct position
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
    width : 3,
    height : 3,
    move : ['', '', '', ''], // need to move away from the edge before rotate
    correct : [0, 0, 0, 0] // need to +/- to correct position
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
    height : 4,
    move : ['both', '', 'both', ''], // need to move away from the edge before rotate
    fromLeft : [1, 0, 2, 0], // need to +/- to correct position
    fromRight : [2, 0, 1, 0] // need to +/- to correct position
}

// all tetrominoes
const theTetrominoes = [
    jTetromino, lTetromino, sTetromino,
    zTetromino, tTetromino, oTetromino, iTetromino
];

const defaultPositionInGrid = 4;

// current tetromino in game
let makeTetromino = function ([random,  rotation, position]) {
    return {
        random : random,
        rotation : rotation,
        position : position,
        body : theTetrominoes[random]['body'][rotation],
        move : theTetrominoes[random]['move'][rotation],
        fromLeft : function () {
            if (theTetrominoes[this.random]['fromLeft'] !== undefined) {
                return theTetrominoes[this.random]['fromLeft'][this.rotation];
            } else {
                return theTetrominoes[this.random]['correct'][this.rotation];
            }
        },
        fromRight : function () {
            if (theTetrominoes[this.random]['fromRight'] !== undefined) {
                return theTetrominoes[this.random]['fromRight'][this.rotation];
            } else {
                return theTetrominoes[this.random]['correct'][this.rotation];
            }
        },
        rotate : function (rotateNow) {
            if (rotateNow !== undefined) {
                this.rotation = rotateNow;
            }
            this.body = theTetrominoes[this.random]['body'][this.rotation];
            this.move = theTetrominoes[this.random]['move'][this.rotation];
        },
        getCoordinates : function () {
            return [this.random, this.rotation, this.position];
        }
    }
}

// current next tetromino in game
let makeMini = function ([random, rotation]) {
    return {
        random : random,
        rotation : rotation,
        mini : theTetrominoes[random]['mini'][rotation],
    }
}

let tetromino = {
    start : true,
    side : '',
    setRandom : function () {
        let random = makeRandom(theTetrominoes.length);
        let rotation = makeRandom(theTetrominoes[0].body.length);
        return [random, rotation];
    },
    // current tetromino in game
    current : {},
    // next tetromino in game
    next : {},
    // resets the current settings of the tetromino
    reNew : function (grid, [random, rotation]) {
        this.start = true;
        this.clear(grid, true);
        this.current = makeTetromino([random, rotation, defaultPositionInGrid]);
        // make new random for next tetromino
        this.next = makeMini(this.setRandom());
        this.draw(grid, true);
    },
    // adds tetromino to the grid
    draw : function (grid, mini = false) {
        if (mini) {
            // draw mini
            this.next.mini.forEach(index => {
                grid.miniSchema[index].classList.add('tetromino');
            })
        } else {
            // draw normal
            this.current.body.forEach(index => {
                grid.schema[this.current.position + index].classList.add('tetromino');
            })
        }
    },
    // removes tetromino from the grid
    clear : function (grid, mini = false) {
        if (mini) {
            // clear mini
            if (this.next.mini === undefined) {
                return;
            }
            this.next.mini.forEach(index => {
                grid.miniSchema[index].classList.remove('tetromino');
            })
        } else {
            // clear normal
            this.current.body.forEach(index => {
                grid.schema[this.current.position + index].classList.remove('tetromino');
            })
        }
    },
    // checks the current position of the tetromino
    // and freezes it if it is at the bottom or above another tetromino
    freeze : function (grid) {
        if (grid.isBottomOrIsBusy(this.current)) {
            this.current.body.forEach(index => {
                grid.schema[this.current.position + index].classList.add('frozen');
            });
            this.reNew(grid,[this.next.random, this.next.rotation]);
        }
    },
    isSide : function (grid) {
        if ((this.current.position + 1) % 10 < grid.halfW) { // correct +1 half width of tetromino
            this.side = 'left'
        } else {
            this.side = 'right'
        }
    },
    moveLeft : function(grid) {
        this.isSide(grid);
        this.clear(grid);
        // check movement inside grid
        if (!grid.leftEdge(this.current)) {
            this.current.position--; // move
        }
        // check neighbour cell for tetromino
        if (grid.isBusy(this.current)) {
            this.current.position++; // undo
        }
        this.draw(grid);
    },
    moveRight : function(grid) {
        this.isSide(grid);
        this.clear(grid);
        // check movement inside grid
        if (!grid.rightEdge(this.current)) {
            this.current.position++; // move
        }
        // check new position for already staying tetromino
        if (grid.isBusy(this.current)) {
            this.current.position--; // undo
        }
        this.draw(grid);
    },
    moveDown : function(grid) {
        if (!this.start) {
            this.clear(grid);
            this.current.position += grid.width;
        }
        this.draw(grid);
        this.start = false;
    },
    rotate : function (grid) {
        this.clear(grid);
        // safe current tetromino to buffer before change the current
        let bufTetromino = makeTetromino(this.current.getCoordinates());

        // make rotation value
        this.current.rotation++
        // if the current rotation gets 4, need change to default 0
        if (this.current.rotation === this.current.body.length) {
            this.current.rotation = 0;
        }
        // make new rotated tetromino
        this.current.rotate()
        // check if it is safe side to rotate
        // also in "if" need to correct current position,
        // because if "moveForm=left" it means that current position will be equal to 9 instead of 10
        // position 9 - will show unCorrect position at left edge
        if (this.side === 'left' && bufTetromino.move === 'left') {
            let correct = this.current.position + bufTetromino.fromLeft();
            if (grid.leftEdge(this.current, correct)) {
                // check if tetromino near edge
                console.log('move from left')
                this.current.position = correct; // move to the right
            }
        } else if (this.side === 'right' && bufTetromino.move === 'right') {
            let correct = this.current.position - bufTetromino.fromRight();
            if (grid.rightEdge(this.current, correct)) {
                console.log('move from right')
                this.current.position = correct; // move to the left
            }
        } else if (bufTetromino.move === 'both') {
            // check if tetromino near edge
            if (this.side === 'left') {
                let correct = this.current.position + bufTetromino.fromLeft();
                if (grid.leftEdge(this.current, correct)) {
                    console.log('in both - left', correct)
                    this.current.position = correct;
                }
            } else {
                let correct = this.current.position - bufTetromino.fromRight();
                if (grid.rightEdge(this.current, correct)) {
                    console.log('in both - right', correct)
                    this.current.position = correct;
                }
            }
        }
        // check new position for already staying tetromino
        if (grid.isBusy(this.current)) {
            console.log('undo settings')
            // undo changes
            this.current = bufTetromino;
        }
        this.draw(grid);
    }
}

function makeRandom(n) {
    return Math.floor(Math.random() * n);
}