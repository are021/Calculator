/*
    Globals
*/
////////////////////////////////////////////////////////////////
const screen = document.querySelector(".onscreen");
const oldanswer = document.querySelector(".oldanswer");
const numbers = ["7","8","9","4","5", "6", "1", "2", "3", "0"]; //Used
const operators = ["+","-","x","/"];    //Used

let operatorPressed = [false,""];  
let firstVal = null;
let secondVal = null;
let methods = 0;
let validOperation = false;
////////////////////////////////////////////////////////////////


/*
    Reset Dom
*/
function clearDiv(){
    screen.textContent = "> ";
}

function resetCalculator(){
    operatorPressed = [false,""];
    firstVal = null;
    secondVal = null;
    oldanswer.innerText = "";
    clearDiv();
}

function resetOthers(){
    secondVal = null;
    operatorPressed = [false,""];
    methods = 0;
    validOperation = false;
}



/*
**  Operations and Math
**
*/

function typeToScreen(str){
    //First Operation
    if (methods == 0){
        if (!(operators.includes(str))){
            if (!firstVal){
                firstVal = "";
            }
            firstVal += str;
            screen.textContent += str;
        }
        else if (operators.includes(str) && (firstVal)){
            operatorPressed[0] = true;
            operatorPressed[1] = str;
            screen.textContent += (" " + str + " ");
            methods += 1;
        }
    }
    else if (methods == 1){
        if (!(operators.includes(str))){
            if (!secondVal){
                secondVal = "";
            }
            secondVal += str;
            screen.textContent += str;
        }
    }


    // //Operators
    // if (operators.includes(str) && !(operatorPressed[0]) && firstVal){
    //     operatorPressed[0] = true;
    //     operatorPressed[1] = str;
    //     screen.textContent += (" " + str + " ");
    // }
    // //First Val
    // else if (!(operatorPressed[0]) && !secondVal){
    //     screen.textContent += str;
    //     if (!firstVal){
    //         firstVal = "";
    //     }
    //     firstVal += str;
    // }
    // else if (operators.includes(str) && operatorPressed[0] && operatorPressed[1]!= ""){
    //     alert("Cannot Enter!");
    // }
    // else if (operatorPressed[0] && operatorPressed[1]!=""){
    //     screen.textContent += str;
    //     if (!secondVal){
    //         secondVal = "";
    //     }
    //     secondVal += str;
    // }
}

function showAnswer(){
    if (!(!operatorPressed[0] || !(firstVal) || !(secondVal))){
        validOperation = true;
    }
    if (validOperation){
        switch(operatorPressed[1]){
            case operators[0]:
                screen.textContent = +firstVal + +secondVal;
                firstVal = +firstVal + +secondVal;
                oldanswer.textContent = firstVal;
                resetOthers();
                break;
            case operators[1]:
                screen.textContent = firstVal - secondVal;
                firstVal = firstVal - secondVal;
                oldanswer.textContent = firstVal;
                resetOthers();
                break;
            case operators[2]:
                screen.textContent = firstVal * secondVal;
                firstVal = firstVal * secondVal;
                oldanswer.textContent = firstVal;
                resetOthers();
                break;
            case operators[3]:
                screen.textContent = firstVal / secondVal;
                firstVal = firstVal / secondVal;
                oldanswer.textContent = firstVal;
                resetOthers();
                break;        
        }
    }
    else{
        alert("bad");
    }
    
}



function main(){
    clearDiv();
    clearButton.removeEventListener('click',main);
    clearButton.addEventListener('click',clearDiv);
    clearButton.addEventListener('dblclick',resetCalculator);
    const numbers = document.querySelectorAll(".numbers button");
    assignNumbers(numbers);
    const operations = document.querySelectorAll("button.operators");
    assignOperations(operations);
}

/*
**  Assign Event Listeners
**
*/

function assignNumbers(nums){
    for (let i = 0; i < nums.length-1; i++){
        nums[i].addEventListener('click',()=>{
            typeToScreen(numbers[i]);
        });
    }
    nums[nums.length-1].addEventListener('click',showAnswer);
    return;
}
function assignOperations(operations){
    for (let i = 0; i < operations.length; i++){
        operations[i].addEventListener('click',()=>{
            typeToScreen(operators[i]);
        });
    }
    return;
}



// Start of Script

const clearButton = document.querySelector("#clear");
clearButton.addEventListener('click',main);
