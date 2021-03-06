// DOMContentLoaded fires when the initial html document has been completely loaded and parsed  
document.addEventListener('DOMContentLoaded', () => {

    // get element with id grid
    const grid = document.querySelector('.grid');
    // get ALL child divs of grid
    // Array.from converts an array-like data structure, into an actual array
    // each div will be idexed in the array:
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const GRID_WIDTH = 10;
    const scoreDisplay = document.querySelector('score');
    const startButton = document.querySelector('start-button');    
    let isAtBottom = true;   

    // the tetrominos
    // each tetromino is an array, containing four arrays representing the four possible rotations
     //The Tetrominoes
    const lTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
        [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
    ]

    const zTetromino = [
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
    ]

    const tTetromino = [
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
    ]

    const oTetromino = [
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
    ]

    const iTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
    
    let currentPosition = 0;

    let current = theTetrominoes[provideRandom(0,theTetrominoes.length)][provideRandom(0,theTetrominoes[0].length)];

    // draw random rotation of random tetromino 
    function draw() {
        current.forEach((index) => {
            console.log('draw on: ' + (currentPosition + index));
            squares[currentPosition + index].classList.add('tetromino');
        });
    }

    // undraw tetromino 
    function unDraw() {
        for (let i = 0; i < current.length; i++) {
            squares[currentPosition + current[i]].classList.remove('tetromino');
        }
    } 

    let timerId = setInterval(moveDown, 100);

    // our render/update loop so far
    function moveDown(){
        if (isAtBottom) {
            unDraw();
            currentPosition += GRID_WIDTH;
            draw();
            freeze();          
        }
    }

    moveDown();

    function freeze(params) {
        // check that condition is true, for SOME of the array items
        if (current.some(index => squares[currentPosition + index + GRID_WIDTH].classList.contains('taken'))) {
            isAtBottom = false;
            // console.log('next/taken: ' + (currentPosition + index + GRID_WIDTH));
        }
    }

    function provideRandom(lowerRange, upperRange) {
        return Math.floor(Math.random() * upperRange); 
    }

});

// var: fucntion scope, potentially global scope
// let: is block scoped, e.g. defined inside a for lop



