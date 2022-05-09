const xTetromino = [
    [1, 11, 21, 31],
    [10, 11, 12, 13],
    [2, 12, 22, 32],
    [20, 21, 22, 23],
    [0, 1, 11, 21],
    [2, 10, 11, 12],
    [1, 11, 21, 22],
    [10, 11, 12, 20],
    [1, 2, 10, 11],
    [1, 11, 12, 22],
    [11, 12, 20, 21],
    [0, 10, 11, 21],
    [0, 1, 11, 12],
    [2, 11, 12, 21],
    [10, 11, 21, 22],
    [1, 10, 11, 20],
    [1, 10, 11, 12],
    [1, 11, 12, 21],
    [10, 11, 12, 21],
    [1, 10, 11, 21],
    [1, 11, 21, 31],
    [10, 11, 12, 13],
    [2, 12, 22, 32],
    [20, 21, 22, 23]
]

const colors = [
    '#00B2CA',
    // '#C7EF00',
    '#0C8346',
    '#33658A',
    '#665687',
    '#D64550',
    '#FFB20F',
    '#FFE548',
    '#06B2A7',
    '#446DF6', 
    // '#8CB369', 
    // '#F4A259',
    // '#5B8E7D', 
    '#FE4A49', 
    // '#2AB7CA', 
    // '#FED766', 
    // '#89023E', 
    '#EA638C',
    '#FF85DE',
    '#9410D1',
];

document.addEventListener('DOMContentLoaded', () => {
    grid.make();
    let position = 0
    function draw() {
        for (let i = 0; i < xTetromino.length; i++) {
            xTetromino[i].forEach(index => {
                grid.schema[position + index].style.backgroundColor = colors[i];
            })
            position += 4 * grid.width
        }

    }
    draw()
})

let grid = {
    schema : [],
    width : 10,
    height : 100,
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

