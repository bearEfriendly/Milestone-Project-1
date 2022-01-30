//<-Back button->\\
function goBack(){
    clearBoard(container)

    document.getElementById('lost').style.display="none"
    document.getElementById("creditsP").style.visibility="hidden"
    document.getElementById("backBtn").style.visibility="hidden"

    document.getElementById("credits").style.visibility="visible"
    document.getElementById("selectModeDiv").style.visibility="visible"
}


//<-Credits->\\
function showCredits() {
    document.getElementById("credits").style.visibility="hidden"
    document.getElementById("selectModeDiv").style.visibility="hidden"
    document.getElementById("startGameBtn").style.visibility="hidden"
    document.getElementById("modeImg").style.visibility="hidden"

    document.getElementById("creditsP").style.visibility="visible"
    document.getElementById("backBtn").style.visibility="visible"
}



//<- Pre-Minesweeper code ->\\
var gameMode = " "


var components = {
    num_of_rows : 5,
    num_of_cols : 10,
    num_of_bombs : 25,
    bomb : '💣',
    alive : true,
    flag: '🚩',
    colors : {1: 'blue', 2: 'green', 3: 'red', 4: 'purple', 5: 'maroon', 6: 'turquoise', 7: 'black', 8: 'grey'}
}



let imgPreview = document.getElementById("modeImg")

// I tried using a let/const to make the code shorter, guess i have to write doc.getElement everytime. \\
function changeModeE() {
    document.getElementById("modeImg").style.visibility="visible"
    document.getElementById("startGameBtn").style.visibility="visible"
    document.getElementById("modeImg").src="assets/10x10.PNG"
    document.getElementById("modeImg").width="250"
    document.getElementById("modeImg").height="250"
    
    return gameMode = "Easy", components.num_of_rows = 10, components.num_of_cols = 10, components.num_of_bombs = 25
}

function changeModeM() {
    document.getElementById("modeImg").style.visibility="visible"
    document.getElementById("startGameBtn").style.visibility="visible"
    document.getElementById("modeImg").src="assets/15x15.PNG"
    document.getElementById("modeImg").width="300"
    document.getElementById("modeImg").height="300"
    return gameMode = "Medium", components.num_of_rows = 15, components.num_of_cols = 15, components.num_of_bombs = 45
}

function changeModeH() {
    document.getElementById("modeImg").style.visibility="visible"
    document.getElementById("startGameBtn").style.visibility="visible"
    document.getElementById("modeImg").src="assets/24x12.PNG"
    document.getElementById("modeImg").width="650"
    document.getElementById("modeImg").height="375"
    return gameMode = "Hard", components.num_of_rows = 12, components.num_of_cols = 24, components.num_of_bombs = 55
}

const container = document.querySelector('#field')

function clearBoard(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//<- Minesweeper code ->\\
function loadingGame() {
    
    components.alive = true;

    document.getElementById("credits").style.visibility="hidden"
    document.getElementById("selectModeDiv").style.visibility="hidden"
    document.getElementById("startGameBtn").style.visibility="hidden"
    document.getElementById("modeImg").style.visibility="hidden"
    document.getElementById("backBtn").style.visibility="visible"
    
    if (gameMode == "Easy") {
        document.getElementById("box").style.right= "500px"
        document.getElementById("box").style.bottom= "225px"
        
    } else if (gameMode == "Medium") {
        document.getElementById("box").style.right= "400px"
        document.getElementById("box").style.bottom= "125px"

    } else if (gameMode == "Hard") {
        document.getElementById("box").style.right= "250px"
        document.getElementById("box").style.bottom= "175px"

    }
    startGame()
}

function startGame() {
    clearBoard(container)
    components.bombs = placeBombs();
    document.getElementById('field').appendChild(createTable());

}

//took me a whole day, BUT I'VE FINALLY DONE IT, the clear board code only happens at the beginning of every game\\
function placeBombs() {
    var i, rows = [];
    
    for (i=0; i<components.num_of_bombs; i++) {
        placeSingleBomb(rows);
    }
    return rows;
} 

function placeSingleBomb(bombs) {

    var nrow, ncol, row, col;
    nrow = Math.floor(Math.random() * components.num_of_rows);
    ncol = Math.floor(Math.random() * components.num_of_cols);
    row = bombs[nrow];
    
    if (!row) {
        row = [];
        bombs[nrow] = row;
    }
    
    col = row[ncol];
    
    if (!col) {
        row[ncol] = true;
        return
    } 
    else {
        placeSingleBomb(bombs);
    }
}

function cellID(i, j) {
    return 'cell-' + i + '-' + j;
}

function createTable() {
    var table, row, td, i, j;
    table = document.createElement('table');
    
    for (i=0; i<components.num_of_rows; i++) {
        row = document.createElement('tr');
        for (j=0; j<components.num_of_cols; j++) {
            td = document.createElement('td');
            td.id = cellID(i, j);
            row.appendChild(td);
            addCellListeners(td, i, j);
        }
        table.appendChild(row);
    }
    return table;
}

function addCellListeners(td, i, j) {
    td.addEventListener('mousedown', function(event) {
        if (!components.alive) {
            return;
        }
        components.mousewhiches += event.which;
        if (event.which === 3) {
            return;
        }
        if (this.flagged) {
            return;
        }
        this.style.backgroundColor = 'lightGrey';
    });

    td.addEventListener('mouseup', function(event) {
      
        if (!components.alive) {
            return;
        }

        if (this.clicked && components.mousewhiches == 4) {
            performMassClick(this, i, j);
        }

        components.mousewhiches = 0;
        
        if (event.which === 3) {
           
            if (this.clicked) {
                return;
            }
            if (this.flagged) {
                this.flagged = false;
                this.textContent = '';
            } else {
                this.flagged = true;
                this.textContent = components.flag;
            }

            event.preventDefault();
            event.stopPropagation();
          
            return false;
        } 
        else {
            handleCellClick(this, i, j);
        }
    });

    td.oncontextmenu = function() { 
        return false; 
    };
}

function handleCellClick(cell, i, j) {
    if (!components.alive) {
        return;
    }

    if (cell.flagged) {
        return;
    }

    cell.clicked = true;

    if (components.bombs[i][j]) {
        cell.style.color = 'red';
        cell.textContent = components.bomb;
        gameOver();
        
    }
    else {
        cell.style.backgroundColor = 'lightgrey';
        num_of_bombs = adjacentBombs(i, j);
        if (num_of_bombs) {
            cell.style.color = components.colors[num_of_bombs];
            cell.textContent = num_of_bombs;
        } 
        else {
            clickAdjacentBombs(i, j);
        }
    }
}

function adjacentBombs(row, col) {
    var i, j, num_of_bombs;
    num_of_bombs = 0;

    for (i=-1; i<2; i++) {
        for (j=-1; j<2; j++) {
            if (components.bombs[row + i] && components.bombs[row + i][col + j]) {
                num_of_bombs++;
            }
        }
    }
    return num_of_bombs;
}

function adjacentFlags(row, col) {
    var i, j, num_flags;
    num_flags = 0;

    for (i=-1; i<2; i++) {
        for (j=-1; j<2; j++) {
            cell = document.getElementById(cellID(row + i, col + j));
            if (!!cell && cell.flagged) {
                num_flags++;
            }
        }
    }
    return num_flags;
}

function clickAdjacentBombs(row, col) {
    var i, j, cell;
    
    for (i=-1; i<2; i++) {
        for (j=-1; j<2; j++) {
            if (i === 0 && j === 0) {
                continue;
            }
            cell = document.getElementById(cellID(row + i, col + j));
            if (!!cell && !cell.clicked && !cell.flagged) {
                handleCellClick(cell, row + i, col + j);
            }
        }
    }
}

function performMassClick(cell, row, col) {
    if (adjacentFlags(row, col) === adjacentBombs(row, col)) {
        clickAdjacentBombs(row, col);
    }
}

function gameOver() {
    components.alive = false;
    document.getElementById('lost').style.display="block";
    
}

function reload(){
    components.alive = true;
    document.getElementById('lost').style.display="none"
    loadingGame();

}
// life is pain, but i got the code to work \\