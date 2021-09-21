const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
    }
    print() {
        // logs field to the console
        for(let i = 0; i < this._field.length; i++) {
        console.log(this._field[i].join(' '));
        }
    }
    getField() {
        return this._field;
      }
      setField(posX, posY, target) {
        this._field[posX][posY] = target;
      }
      static generateField(height, width, percentage) {
        if(percentage > 25) percentage = 25;
        let holeCount = Math.floor(height*width*percentage/100);
        let hatCount = 1;
    
        let matrix = new Array(height); //initialize matrix
        for(let i=0; i< height; i++) {
          matrix[i] = new Array(width);
          for(let j=0; j< width; j++) {
            matrix[i][j] = fieldCharacter;
          }
        }
        matrix[0][0] = pathCharacter;
    
        while(holeCount > 0) {
          let a = Math.floor(Math.random()*(height));
          let b = Math.floor(Math.random()*(width));
          if(hatCount === 1 && matrix[a][b] != pathCharacter) {
            matrix[a][b] = hat;
            hatCount--;
          }
          if(matrix[a][b] === fieldCharacter && matrix[a][b] != hat) {
            matrix[a][b] = hole;
            holeCount--;
          }
        }
        return matrix;
      }
    }
    
    let h = prompt('height > ');
    let w = prompt('width > ');
    let p = prompt('percentage > ');
    const field = new Field(Field.generateField(h,w,p)); //generate field instance
    
    //working
    let run = true;
    let posX = 0;
    let posY = 0;
    
    while(run) {
      field.print();
      let direction = prompt('Choose direction! W:UP A:LEFT S:DOWN D:RIGHT > ');
      switch(direction) {
        case 'w': { //up
          posX--;
          break;
        }
        case 'a': { //left
          posY--;
          break;
        }
        case 's': { //down
          posX++;
          break;
        }
        case 'd': { //right
          posY++;
          break;
        }
      }
      if(field.getField()[posX][posY] === hat) {
        console.log('you won');
        run = false;
       } else if(field.getField()[posX][posY] === hole || posX >= h || posY >= w || posX < 0 || posY < 0) {
        console.log('you lose');
        run = false;
       } else {
        field.setField(posX, posY, pathCharacter);
       }
    }




const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);
  myField.print();

