class Grid {
  constructor(n, cellWidth) {
    this.n = n
    this.cellWidth = cellWidth
    this.grid = [];
    for (let i = 0; i < n; i++) {
      let row = [];
      for (let j = 0; j < n; j++) {
        row.push(Math.random() < 0.9 ? 0 : 1);
      }
      this.addRow(row);
    }
  }
  
  addRow(row) {
    this.grid.push(row);
  }

  getRow(index) {
    return this.grid[index];
  }

  getCol(index) {
    let col = [];
    for (let i = 0; i < this.n; i++) {
      col.push(this.grid[i][index]);
    }
    return col;
  }

  toggleCell(row, col) {
    this.grid[row][col] = (this.grid[row][col] + 1) % 3;
  }

  handleClick() {
    // Toggle cell if clicked
    let row = Math.floor((mouseX - width/2) / this.cellWidth) + this.n/2;
    let col = Math.floor((mouseY - height/2) / this.cellWidth) + this.n/2;
    if (row >= 0 && row < this.n && col >= 0 && col < this.n) {
      this.toggleCell(row, col);
    }
  }

  displayGrid() {
    // Draw gridlines
    for (let i = -this.n/2; i < this.n/2+1; i++) {
      if ((i + this.n/2) % 10 == 0) {
        stroke(0);
      } else {
        stroke(200);
      }
      line(i * this.cellWidth, -this.n/2 * this.cellWidth, i * this.cellWidth, this.n/2 * this.cellWidth);
      line(-this.n/2 * this.cellWidth, i * this.cellWidth, this.n/2 * this.cellWidth, i * this.cellWidth);
    }
    // Draw cells
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (this.grid[i][j] == 0) {
          // Blank cell
          fill(255);
          rect((i - this.n/2) * this.cellWidth, (j - this.n/2) * this.cellWidth, this.cellWidth, this.cellWidth);
        } else if (this.grid[i][j] == 1) {
          // Filled cell
          fill(0);
          rect((i - this.n/2) * this.cellWidth, (j - this.n/2) * this.cellWidth, this.cellWidth, this.cellWidth);
        } else if (this.grid[i][j] == 2) {
          // Crossed cell
          fill(0);
          line((i - this.n/2) * this.cellWidth, (j - this.n/2) * this.cellWidth, (i - this.n/2 + 1) * this.cellWidth, (j - this.n/2 + 1) * this.cellWidth);
          line((i - this.n/2) * this.cellWidth, (j - this.n/2 + 1) * this.cellWidth, (i - this.n/2 + 1) * this.cellWidth, (j - this.n/2) * this.cellWidth);
        }
      }
    }
  }
}

let grid;

function setup() { 
  createCanvas(window.innerWidth, window.innerHeight);
  grid = new Grid(50, 15);
} 

function mouseClicked() {
  grid.handleClick();
}

function draw() { 
  background(255);
  translate(width/2, height/2);
  stroke(0, 0, 0);
  strokeWeight(2);
  grid.displayGrid();
}
