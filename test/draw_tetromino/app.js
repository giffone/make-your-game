const xTetromino = [
    [1, 11, 21, 31],
    [10, 11, 12, 13],
    [2, 12, 22, 32],
    [20, 21, 22, 23]
]

document.addEventListener('DOMContentLoaded', () => {
    grid.make();
    let position = 0
    function draw() {
        for (let i = 0; i < xTetromino.length; i++) {
            xTetromino[i].forEach(index => {
                grid.schema[position + index].classList.add('tetromino');
            })
            position += 4 * grid.width
        }

    }
    draw()
})

let grid = {
    schema : [],
    width : 10,
    height : 20,
    make : function() {
        let schemaSize = this.width * this.height;
        let gridHTML = document.querySelector(".grid");
        for (let i = 0; i < schemaSize; i++) {
            let gridElement = document.createElement("div");
            gridElement.setAttribute("class", "line");
            gridHTML.appendChild(gridElement);
            this.schema = [...this.schema, gridElement];
        }
    },
};

