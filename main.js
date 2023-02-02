class Game {
  constructor(n, cellWidth) {
    this.n = n;
    this.cellWidth = cellWidth;

    this.gameOver = false;

    this.solution = [];
    this.currentGrid = [];
    for (let i = 0; i < n; i++) {
      let solutionRow = [];
      let currentRow = [];
      for (let j = 0; j < n; j++) {
        solutionRow.push(Math.random() < 0.7 ? 0 : 1);
        currentRow.push(0);
      }
      this.solution.push(solutionRow);
      this.currentGrid.push(currentRow);
    }
    [this.targetRowBlocks, this.targetColBlocks] = this.getRowAndColBlocks(this.solution);
    [this.rowBlocks, this.colBlocks] = this.getRowAndColBlocks(this.currentGrid);
  }
  
  getRow(grid, index) {
    return grid[index];
  }

  getCol(grid, index) {
    let col = [];
    for (let i = 0; i < this.n; i++) {
      col.push(grid[i][index]);
    }
    return col;
  }

  getBlocks(line) {
    // Return a list of blocks of 1s in an array
    let blocks = [];
    let i = 0;
    for (let j = 0; j < line.length+1; j++) {
      if (j==line.length || line[j] != 1) {
        if (i > 0) {
          blocks.push(i);
          i = 0;
        }
      } else if (line[j] == 1) {
        i += 1;
      }
    }
    return blocks;
  }

  getRowAndColBlocks(arr) {
    let rowBlocks = [];
    let colBlocks = [];
    for (let i = 0; i < this.n; i++) {
      rowBlocks.push(this.getBlocks(this.getRow(arr, i)));
      colBlocks.push(this.getBlocks(this.getCol(arr, i)));
    }
    return [rowBlocks, colBlocks];
  }

  toggleCell(row, col) {
    this.currentGrid[row][col] = (this.currentGrid[row][col] + 1) % 3;
  }

  currentGridIsSolved() {
    for (let i = 0; i < this.n; i++) {
      if (this.rowBlocks[i].length != this.targetRowBlocks[i].length || this.colBlocks[i].length != this.targetColBlocks[i].length) {
        return false;
      }
      for (let j = 0; j < this.rowBlocks[i].length; j++) {
        if (this.rowBlocks[i][j] != this.targetRowBlocks[i][j]) {
          return false;
        }
      }
      for (let j = 0; j < this.colBlocks[i].length; j++) {
        if (this.colBlocks[i][j] != this.targetColBlocks[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  handleClick() {
    if (!this.gameOver) {
      // Toggle cell if clicked
      let row = Math.floor((mouseX - width/2) / this.cellWidth) + this.n/2;
      let col = Math.floor((mouseY - height/2) / this.cellWidth) + this.n/2;
      if (row >= 0 && row < this.n && col >= 0 && col < this.n) {
        this.toggleCell(row, col);
      }
      [this.rowBlocks, this.colBlocks] = this.getRowAndColBlocks(this.currentGrid);
      if (this.currentGridIsSolved()) {
        alert("You win!");
        this.gameOver = true;
      }
    }
  }

  displayGame() {
    // Draw cells
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (this.currentGrid[i][j] == 0) {
          // Blank cell
          fill(255);
          rect((i - this.n/2) * this.cellWidth, (j - this.n/2) * this.cellWidth, this.cellWidth, this.cellWidth);
        } else if (this.currentGrid[i][j] == 1) {
          // Filled cell
          fill(50);
          rect((i - this.n/2) * this.cellWidth, (j - this.n/2) * this.cellWidth, this.cellWidth, this.cellWidth);
        } else if (this.currentGrid[i][j] == 2) {
          // Crossed cell
          fill(0);
          line((i - this.n/2) * this.cellWidth, (j - this.n/2) * this.cellWidth, (i - this.n/2 + 1) * this.cellWidth, (j - this.n/2 + 1) * this.cellWidth);
          line((i - this.n/2) * this.cellWidth, (j - this.n/2 + 1) * this.cellWidth, (i - this.n/2 + 1) * this.cellWidth, (j - this.n/2) * this.cellWidth);
        }
      }
    }
    // Draw gridlines
    noFill();
    for (let i = -this.n/2; i < this.n/2+1; i++) {
      if ((i + this.n/2) % 10 != 0) {
        stroke(200);
        line(i * this.cellWidth, -this.n/2 * this.cellWidth, i * this.cellWidth, this.n/2 * this.cellWidth);
        line(-this.n/2 * this.cellWidth, i * this.cellWidth, this.n/2 * this.cellWidth, i * this.cellWidth);
      }
    }
    for (let i = -this.n/2; i < this.n/2+1; i++) {
      if ((i + this.n/2) % 5 == 0) {
        stroke(0);
        line(i * this.cellWidth, -this.n/2 * this.cellWidth, i * this.cellWidth, this.n/2 * this.cellWidth);
        line(-this.n/2 * this.cellWidth, i * this.cellWidth, this.n/2 * this.cellWidth, i * this.cellWidth);
      }
    }
    // Draw row and column blocks
    for (let i = 0; i < this.n; i++) {
      let row = this.targetRowBlocks[i];
      let col = this.targetColBlocks[i];
      let x = (i - this.n/2) * this.cellWidth;
      let y = (i - this.n/2) * this.cellWidth;

      textSize(12);
      fill(0);
      textAlign(LEFT, CENTER);

      text(col.join(', '), this.n/2 * this.cellWidth + 10, y+this.cellWidth/2);

      rotate(radians(90));
      text(row.join(', '), this.n/2 * this.cellWidth + 10, (this.n-x)-this.cellWidth/2-30);
      rotate(radians(-90));
    }
  }
}

let game;

function setup() { 
  createCanvas(window.innerWidth, window.innerHeight);
  game = new Game(30, 20);
} 

function mouseClicked() {
  game.handleClick();
}

function draw() { 
  background(255);
  translate(width/2, height/2);
  stroke(0, 0, 0);
  strokeWeight(0.8);
  game.displayGame();
}

// function windowResized() {
//   resizeCanvas(window.innerWidth, window.innerHeight);
// }
