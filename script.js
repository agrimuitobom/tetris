const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const row = 20;
const col = 10;
const sq = 30;
const vacant = "#000";

let S = [
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]// ... 他の回転の状態も追加（必要に応じて）
];

let T = [
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]
    // ... 他の回転の状態も追加（必要に応じて）
];

let O = [
    [
        [1, 1],
        [1, 1]
    ],
    // Oテトロミノは回転しないため、他の状態は不要です
];

let L = [
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
    ],
    [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ]
    // ... 他の回転の状態も追加（必要に応じて）
];

let I = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ]
    // ... 他の回転の状態も追加（必要に応じて）
];

let J = [
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ]
    // ... 他の回転の状態も追加（必要に応じて）
];

let Z = [
    [
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],
    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0]
    ]
    // ... 他の回転の状態も追加
];
// ... 他のテトロミノの定義（S, T, O, L, I, J）はここに続く

const pieces = [
    [Z, "red"],
    [S, "green"],
    [T, "yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"]
];

function randomPiece(){
    let r = Math.floor(Math.random() * pieces.length);
    return new Piece(pieces[r][0], pieces[r][1]);
}

function Piece(tetromino, color){
    this.tetromino = tetromino;
    this.color = color;
    this.tetrominoN = 0;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.x = 3;
    this.y = 0; // -2 から 0 に変更して、テトロミノがボードの内部から始まることを確認します

}


let board = [];
for (let r = 0; r < row; r++) {
    board[r] = [];
    for (let d = 0; d < col; d++) {
        board[r][d] = vacant;
    }
}

function drawSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * sq, y * sq, sq, sq);
    context.strokeStyle = "black";
    context.strokeRect(x * sq, y * sq, sq, sq);
}

function drawBoard() {
    for (let r = 0; r < row; r++) {
        for (let d = 0; d < col; d++) {
            drawSquare(d, r, board[r][d]);
        }
    }
}

drawBoard();

// ... (S, T, O, L, I, J, Z の配列定義は省略します。元のコードをそのまま使用してください。)

// ... (pieces 配列の定義も元のコードをそのまま使用してください。)

function randomPiece() {
    let r = Math.floor(Math.random() * pieces.length);
    return new Piece(pieces[r][0], pieces[r][1]);
}

function Piece(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;
    this.tetrominoN = 0;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.x = 3;
    this.y = -2;

    this.draw = function () {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let d = 0; d < this.activeTetromino.length; d++) {
                if (this.activeTetromino[r][d]) {
                    drawSquare(this.x + d, this.y + r, this.color);
                }
            }
        }
    };

    this.unDraw = function () {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let d = 0; d < this.activeTetromino.length; d++) {
                if (this.activeTetromino[r][d]) {
                    drawSquare(this.x + d, this.y + r, vacant);
                }
            }
        }
    };

    this.collision = function (x, y, piece) {
        for (let r = 0; r < piece.length; r++) {
            for (let d = 0; d < piece.length; d++) {
                if (!piece[r][d]) continue;
                let newX = this.x + d + x;
                let newY = this.y + r + y;

                if (newX < 0 || newX >= col || newY >= row) {
                    return true;
                }

                if (newY < 0) continue;

                if (board[newY][newX] !== vacant) {
                    return true;
                }
            }
        }
        return false;
    };

    // ... (moveDown, moveLeft, moveRight メソッドの定義は元のコードをそのまま使用してください。)

    this.rotate = function () {
        let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
        let kick = 0;
    
        if (this.collision(0, 0, nextPattern)) {
            if (this.x > col / 2) {
                kick = -1; 
            } else {
                kick = 1; 
            }
        }
    
        if (!this.collision(0, 0, nextPattern)) {
            this.unDraw();
            this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
            this.activeTetromino = this.tetromino[this.tetrominoN];
            this.draw();
        } else if (!this.collision(kick, 0, nextPattern)) {
            this.unDraw();
            this.x += kick;
            this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
            this.activeTetromino = this.tetromino[this.tetrominoN];
            this.draw();
        }
    };
    
    

    this.lock = function () {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let d = 0; d < this.activeTetromino.length; d++) {
                if (!this.activeTetromino[r][d]) continue;

                if (this.y + r < 0) {
                    alert("Game Over");
                    gameOver = true;
                    break;
                }

                board[this.y + r][this.x + d] = this.color;
            }
        }

        for (let r = 0; r < row; r++) {
            let isRowFull = true;
            for (let d = 0; d < col; d++) {
                isRowFull = isRowFull && (board[r][d] !== vacant);
            }
            if (isRowFull) {
                for (let y = r; y > 1; y--) {
                    for (let d = 0; d < col; d++) {
                        board[y][d] = board[y - 1][d];
                    }
                }
                for (let d = 0; d < col; d++) {
                    board[0][d] = vacant;
                }
            }
        }

        drawBoard();

        p = randomPiece();
    };

    this.moveDown = function () {
        if (!this.collision(0, 1, this.activeTetromino)) {
            this.unDraw();
            this.y++;
            this.draw();
        } else {
            this.lock();
        }
    };
}

function CONTROL(event) {
    if (event.keyCode === 37) {
        p.moveLeft();
        dropStart = Date.now();
    } else if (event.keyCode === 13) {  // Enterキーで回転
        p.rotate();
        dropStart = Date.now();
    } else if (event.keyCode === 39) {
        p.moveRight();
        dropStart = Date.now();
    } else if (event.keyCode === 40) {
        p.moveDown();
    }
}

document.addEventListener("keydown", CONTROL);


let dropStart = Date.now();
let gameOver = false;
let p = randomPiece();

function drop() {
    let now = Date.now();
    let delta = now - dropStart;

    if (delta > 1000) {
        p.moveDown();
        dropStart = Date.now();
    }

    if (!gameOver) {
        requestAnimationFrame(drop);
    }
}

Piece.prototype.moveLeft = function() {
    if (!this.collision(-1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x--;
        this.draw();
    }
};

Piece.prototype.moveRight = function() {
    if (!this.collision(1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x++;
        this.draw();
    }
};


drop();
