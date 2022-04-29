export { grid }

let grid = {
    schema : [],
    miniSchema : [],
    width : 10,
    height : 20,
    halfW : 5, // width / 2
    // builds new grid, append it to html and makes array for schema
    make : function() {
        let schemaSize = this.width * this.height;
        let gridHTML = document.querySelector(".grid");
        for (let index = 0; index < schemaSize; index++) {
            let gridElement = document.createElement("div");
            gridElement.setAttribute("class", "line");
            gridElement.classList.add(String(index)) // for test
            gridHTML.appendChild(gridElement);
            this.schema = [...this.schema, gridElement];
        }
    },
    // builds mini grid for next tetromino
    makeMini : function() {
        let miniSchemaSize = 4 * 4
        let miniGridHTML = document.querySelector(".mini-grid");
        for (let index = 0; index < miniSchemaSize; index++) {
            let miniGridElement = document.createElement("div");
            miniGridElement.setAttribute("class", "line");
            miniGridHTML.appendChild(miniGridElement);
            this.miniSchema = [...this.miniSchema, miniGridElement];
        }
    },
    // removes all tetromino from the grid for new game
    clear : function (tetromino, randomRotation) {
        this.schema.forEach((element, index) => {
            element.setAttribute("class", "line");
            element.classList.add(String(index)) // for test
        });
        this.miniSchema.forEach(element => {
            element.setAttribute("class", "line");
        });
        tetromino.reNew(grid, randomRotation);
    },
    // after movement checks if the current
    // new position is a part of another tetromino
    isBusy : function (current) {
        return current.body.some(index =>
            this.schema[current.position + index].classList.contains('frozen')
        );
    },
    // check tetromino at the bottom or got up on another tetromino
    isBottomOrIsBusy : function (current) {
        let lSchema = this.schema.length
        console.log(current)
        for (let index = current.body.length - 1; index >= 0; index--) {
            let bottom = current.body[index] + current.position + this.width;
            if (bottom + 1 > lSchema || this.schema[bottom].classList.contains('frozen')) {
                return true
            }
        }
        return false
    },
    // checks if this is a left edge of the grid
    // indexes of the left side = 0, 10, 20, 30 ... [0, 0, 0, 0 ...]
    leftEdge : function (current, position) {
        return current.body.some(index => (index + position) % this.width === 0);
    },
    // checks if this is a right edge of the grid
    // indexes of the right side = 9, 19, 29, 39 ... [9, 9, 9, 9 ...]
    rightEdge : function (current, position) {
        return current.body.some(index => (index + position) % this.width === this.width - 1);
    },
};