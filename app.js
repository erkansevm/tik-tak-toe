

const gameBoard = (()=>{
   //Array 
    let _cells=[];
    let gameStatus = true;
    // Possible win conditions for check later
    let winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    
   //Fill  given index with given number
    let fill = (index,withWhat)=>{
      _cells[index] = withWhat;
    }

    //Log every item in array
    let logCells = ()=>{
      console.log("-----");
      _cells.forEach(cell => console.log(cell) );
    }
    
    // Checking win status
    let checkWinStatus = (marker)=>{
        
      // Look arrays in winConditions array
       winConditions.forEach(conditionArray => {
          let count = 0;
          //Look index written in current array
          conditionArray.forEach(index =>{
           
            if(count < 3){
               // if we have an [marker] at this index
              if (_cells[index]==marker) {
                //İncrease counter
                count++;
              } 
            } 
            //When we searched this condition and if we have 3 match
            if(count == 3){
              gameStatus = false;
             return
            }
          });
         
       });
    };

    let getGameStatus = ()=>{
      return gameStatus;
    }
    let setGameStatus = (value) =>{
      gameStatus = value;
    }

    let clearCells =()=>{
       for (let index = 0; index < 9; index++) {
         _cells.pop();
       }
    }

    return {
      getGameStatus,
      fill,
      logCells,
      checkWinStatus,
      clearCells,
      setGameStatus
    }
})();



const gameFlow = (()=>{
  //DOM cells
  let _cellsHTML = document.querySelectorAll(".cell");
  let player1 = new Player("X","Erkan");
  let player2 = new Player("O","Selman");
  let currentPlayer = new Player(player1.marker,"checker");
  let resetBtn = document.querySelector("#reset");
  const infoDiv = document.querySelector(".info");
  
  // Adding marker to elements when clicked
  for (let index = 0; index < _cellsHTML.length; index++) { 
    const element = _cellsHTML[index];
    element.addEventListener('click',()=>{
      
      //Checking  is current element empty
      if(!element.classList.contains("X") && !element.classList.contains("O")){
        element.firstChild.textContent = currentPlayer.marker;
        //Filling element
        element.classList.add(currentPlayer.marker);
        gameBoard.fill(index,currentPlayer.marker);

        //checking is there any winner in  every turn
        gameBoard.checkWinStatus(currentPlayer.marker);
        
        //İf there is a winner
        if (gameBoard.getGameStatus() == false) {
          //Displaying winner marker
           infoDiv.firstElementChild.textContent = currentPlayer.marker + " wins!.Wait for next round";
          //Clearing bord 
           gameBoard.clearCells();
           gameBoard.setGameStatus(true);
           setTimeout(() => {
             clearCellsDiv();
             infoDiv.firstElementChild.textContent="X turn";
           }, 3000);
           return
        }
  
        changeTurn();
      }
    });
  }
  
  //Clearing board when clicked
  resetBtn.addEventListener('click',()=>{
    gameBoard.clearCells();
    setTimeout(() => {
      clearCellsDiv();
      currentPlayer.marker = "X";
      infoDiv.firstElementChild.textContent = currentPlayer.marker+" turn.";
     
    }, 1000);
  })



  let changeTurn = ()=>{
    //Whenever this func called we will change the currentPlayer marker to other player.
    if (currentPlayer.marker == player1.marker) {
      currentPlayer.marker = player2.marker;
      infoDiv.firstElementChild.textContent = currentPlayer.marker + " turn.";
    }else{
      currentPlayer.marker = player1.marker;
      infoDiv.firstElementChild.textContent = currentPlayer.marker + " turn.";
    }
  }


  let clearCellsDiv = ()=>{
    // Clearing dom element 
    _cellsHTML.forEach(element => {
      if (element.classList.contains("X")) {
        element.classList.remove("X");
      }else if(element.classList.contains("O")){
        element.classList.remove("O");
      }
      element.firstChild.textContent = "";
    });
  }
  

  
  return{
    changeTurn
  }
})();



function Player(marker,name) {
  this.marker = marker;
  this.name = name;
}


