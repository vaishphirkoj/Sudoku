let sudoku=[
    [0 ,0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1,9 ,0 ,0, 0 ,4 ,5 ,0 ,0],
    [8, 2, 0 ,1 ,0 ,0, 0, 4, 0],
    [0, 0, 4 ,6 ,0 ,2, 9 ,0 ,0],
    [0, 5, 0 ,0 ,0 ,3 ,0 ,2, 8],
    [0, 0, 9 ,3, 0 ,0, 0, 7, 4],
    [0, 4, 0 ,0 ,5 ,0 ,0 ,3 ,6],
    [7, 0, 3 ,0, 1 ,8 ,0 ,0, 0]
    ];

    console.log("                   ****************SUDOKU BEFORE SOLVE*************************");
    console.table(sudoku);
    console.log("                   ****************SUDOKU AFTER SOLVE*************************");
   


    //Function for check in Row

    function  checkRow(board,Row,num)
    {
        for(let i=0;i<board.length;i++)
        {
            if(board[Row][i]==num)
            return true;
        }
        return false;
    }

    //function for check in Column
    function checkColumn(board,column,num)
    {
        for(let i=0;i<board.length;i++)
        {
            if(board[i][column]==num)
            return true;
        }
        return false;
    }
    //Functin for Check in each Grid

    function checkGrid(board,row,column,num)
    {
        let tempRow,tempColumn;
        if(row<3)tempRow=0;else if(row<6)tempRow=3;else tempRow=6;
        if(column<3)tempColumn=0; else if(column<6)tempColumn=3;else tempColumn=6;
        for(let i=tempRow;i<tempRow+3;i++)
        {
            for(let j=tempColumn;j<tempColumn+3;j++)
            {
                if(board[i][j]==num)
                return true;
            }
        }

        return false;
    }
    //Function For Check Valid number

    function isValidNumber(board,row,column,num)
    {
        return !checkRow(board,row,num)&&!checkColumn(board,column,num)&&!checkGrid(board,row,column,num);
    }

    //Function For Solve board.......
    function solveBoard(board)
    {
        
        for(let i=0;i<board.length;i++)
        {
            for(let j=0;j<board.length;j++)
            {
                if(board[i][j]==0)
                {
                    for(let value=1;value<=9;value++)
                    {
                        if(isValidNumber(board,i,j,value))
                        {
                            board[i][j]=value;
                            if (solveBoard(board)) {
                                return true;
                              }
                              else {
                                board[i][j] = 0;
                              }

                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }








///Function For setup Game 

function setup()
{
    let mainDiv=document.createElement("div");
    mainDiv.classList="main";
    let set=document.createElement("div");
    set.classList="sudokuSetup";
    mainDiv.appendChild(set);
    let c=0;
   for(let i=0;i<sudoku.length;i++)
   {
        for(let j=0;j<sudoku[i].length;j++)
        {
            c++;
            let newdiv=document.createElement("div");
            newdiv.classList=`element`;
            if(j==3||j==6)
            newdiv.classList.add(`borderleft`);
            if(i==3||i==6)
            newdiv.classList.add(`bordertop`);
           let inp=document.createElement("input");
           inp.classList=`elm${c}`;
           if(sudoku[i][j]!=0)
           {
            inp.value=sudoku[i][j];
            inp.setAttribute("readonly","");
           }
           else
           {
               inp.style.backgroundColor="coral";
           }
            newdiv.appendChild(inp);

            // newdiv.innerHTML=`<input value="${sudoku[i][j]}">`;
           

            set.appendChild(newdiv);
           
        }
    
    }
    document.body.appendChild(mainDiv);
    let buttonDiv=document.createElement("div");
    let button=document.createElement("button");
    buttonDiv.classList.add("btnDiv");
    buttonDiv.appendChild(button);
    button.innerText="SOLVE";
    mainDiv.appendChild(buttonDiv);

    button.onclick=()=>{
                   solveBoard(sudoku);
                   console.table(sudoku);
                     let t=1;
                    sudoku.forEach((elem,inx)=>{
                        elem.forEach((correctElem)=>{
                            let inp=document.querySelector(`.elm${t}`);
                      
                        if(correctElem==0)
                        correctElem="";
                        inp.value=correctElem;
                        t++;

                        })
                        
                    });
                    }
}
setup();


