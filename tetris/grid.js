export { grid, bingoColor }

const gridHTML = document.querySelector(".grid");
const miniGridHTML = document.querySelector(".mini-grid");
const scoreHTML = document.querySelector('#score');
const linesHTML = document.querySelector('#lines');
const totalHTML = document.querySelector('#total');
let score = 0, lines = 0;

const bingoColor = '#FF312E';

let grid = {
    schema : [],
    miniSchema : [],
    width : 10,
    height : 20,
    halfW : 5, // width / 2
    bingoLine : [],
    // builds new grid, append it to html and makes array for schema
    make : function() {
        let schemaSize = this.width * this.height;
        for (let index = 0; index < schemaSize; index++) {
            let gridElement = document.createElement("div");
            gridElement.setAttribute("class", "line");
            gridHTML.appendChild(gridElement);
            this.schema = [...this.schema, gridElement];
        }
    },
    // builds mini grid for next tetromino
    makeMini : function() {
        let miniSchemaSize = 4 * 4;
        for (let index = 0; index < miniSchemaSize; index++) {
            let miniGridElement = document.createElement("div");
            miniGridElement.setAttribute("class", "line");
            miniGridHTML.appendChild(miniGridElement);
            this.miniSchema = [...this.miniSchema, miniGridElement];
        }
    },
    // founds whole line frozen
    bingo : function () {
        let catched = 0;
        let schemaSize = this.width * this.height;
        for (let index = 0; index < schemaSize - 1; index += this.width) {
            let line = [index, index+1, index+2, index+3, index+4,
                index+5, index+6, index+7, index+8, index+9];
            if (line.every(index => this.schema[index].classList.contains('frozen'))) {
                score += 10;
                catched++;
                scoreHTML.innerHTML = String(score);
                line.forEach(index => {
                    this.schema[index].classList.add("bingo");
                    this.schema[index].style.backgroundColor = bingoColor;
                });
                this.bingoLine = [...this.bingoLine, index];
            }
        }
        return catched > 0
    },
    // removes line frozen
    remove : function () {
        let lBingoLine = this.bingoLine.length;
        if (lBingoLine === 0) {
            return false;
        } else if (lBingoLine > 1) {
            lines += lBingoLine * 100;
            linesHTML.innerHTML = String(lines);
        }
        this.bingoLine.forEach(index => {
            let removedLine = this.schema.splice(index, this.width);
            // add line above
            this.schema = removedLine.concat(this.schema);
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(index => {
                this.schema[index].setAttribute("class", "line"); // will remove frozen
                this.schema[index].style.backgroundColor = '';
            });
            // add to html
            this.schema.forEach(element => {
                gridHTML.appendChild(element)
            });
        })
        totalHTML.innerHTML = String(score + lines);
        this.bingoLine = [];
        return true;
    },
    // removes all tetromino from the grid for new game
    clear : function () {
        score = 0; lines = 0;
        scoreHTML.innerHTML = String(score);
        linesHTML.innerHTML = String(lines);
        totalHTML.innerHTML = '0';
        this.schema.forEach((element, index) => {
            element.setAttribute("class", "line");
            element.style.backgroundColor = '';
        });
        this.miniSchema.forEach(element => {
            element.setAttribute("class", "line");
            element.style.backgroundColor = '';
        });
    },
    // left edge = 0, 10, 20, 30, ... [0, 0, 0, 0, ...]
    isLeftEdge : function (position) {
        return position % this.width === 0;
    },
    // right edge = 9, 19, 29, 39, ... [9, 9, 9, 9, ...]
    isRightEdge : function (position) {
        return position % this.width === this.width - 1;
    },
    // checks if this is a left edge of the grid
    onLeftEdge : function (current, position) {
        if (position === undefined) {
            return current.body.some(index => this.isLeftEdge(index + current.position));
        } else {
            return current.body.some(index => this.isLeftEdge(index + position));
        }
    },
    // checks if this is a right edge of the grid
    onRightEdge : function (current, position) {
        if (position === undefined) {
            return current.body.some(index => this.isRightEdge(index + current.position));
        } else {
            return current.body.some(index => this.isRightEdge(index + position));
        }
    },
    // after movement checks if the current
    // new position is a part of another tetromino
    isBusy : function (current) {
        return current.body.some(index => {
            return this.schema[current.position + index].classList.contains('frozen')
        });
    },
    // check tetromino at the bottom or got up on another tetromino
    isBottomOrIsBusy : function (current) {
        let lSchema = this.schema.length;
        for (let index = current.body.length - 1; index >= 0; index--) {
            let bottom = current.body[index] + current.position + this.width;
            if (bottom + 1 > lSchema || this.schema[bottom].classList.contains('frozen')) {
                return true;
            }
        }
        return false;
    },
};