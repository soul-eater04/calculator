function addKeys(numpad){
    const buttonValues = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '.', '0', '=', '+'
    ];
    for(let i = 0 ; i < 4 ; i ++){
        const bigBox = document.createElement('div');
        bigBox.style.display = 'flex';
        bigBox.style.gap = '4px';
        bigBox.style.flexGrow = '1';
        for(let j = 0 ; j < 4; j++){
            const smallBox = document.createElement('div');
            smallBox.style.flex = '1 1 0';
            smallBox.style.height = '80px';
            smallBox.style.border = '2px solid black';
            smallBox.style.backgroundColor = 'lightgray';
            smallBox.style.borderRadius = '5px';
            smallBox.style.transition = 'background-color 0.3s ease';
            smallBox.style.display = 'flex';
            smallBox.style.justifyContent = 'center';
            smallBox.style.alignItems = 'center';
            smallBox.style.fontSize = '32px';
            smallBox.addEventListener('click',(e) => keyClicked(e));
            smallBox.addEventListener('mouseover', function () {
                smallBox.style.backgroundColor = 'darkgray';
            });

            smallBox.addEventListener('mouseout', function () {
                smallBox.style.backgroundColor = 'lightgray';
            });

            const value = buttonValues[i * 4 + j];
            const textNode = document.createTextNode(value);
            smallBox.appendChild(textNode);

            bigBox.appendChild(smallBox);
        }
        numpad.appendChild(bigBox);
    }
}

function operate(num1 , num2 , operand){
    switch(operand){
        case '+':
            return Number(num1) + Number(num2);
        case '-':
            return num1-num2;
        case '*':
            return num1*num2;
        case '/':
            if(num2 === 0){
                alert("CANT DIVIDE BY 0");
                return undefined;
            }
            else{
                return num1/num2;
            }
        default:
            return undefined;
    }
}

function keyClicked(e) {
    const key = e.target.textContent;
    if(key === "="){
        let ans = operate(num1,num2,operand);
        textDisplay(ans,key);
    }
    if(isNaN(Number(key)) && operandKeyClicked){
        let ans = operate(num1,num2,operand);
        const topDisplay = document.querySelector('.top-display');
        topDisplay.textContent = ans + key;
        const btmDisplay = document.querySelector('.bottom-display');
        btmDisplay.textContent = ans;
        num1 = ans;
        operand = key;
        num2 = '';
        operandKeyClicked = true;
        return;
    }
    if (isNaN(Number(key)) && isOperand(key)) {
        operand = key;
        operandKeyClicked = !operandKeyClicked;
        textDisplay('',key);
        console.log(operand);
    } else if (!isNaN(Number(key)) && !operandKeyClicked) {
        num1 = num1 + '' + key;
        textDisplay(num1,key);
        console.log('num1');
    } else if (!isNaN(Number(key)) && operandKeyClicked) {
        num2 = num2 + key;
        textDisplay(num2,key);
        console.log(num2);
    }
}

function isOperand(key){
    return key === "/" || key === "*" || key === "-" || key === "+";
}

function textDisplay(num,key){
    const maxLength = 9;
    if(num.length > maxLength){
        return;
    }
    const btmDisplay = document.querySelector('.bottom-display');
    const topDisplay = document.querySelector('.top-display');
    if(key === "="){
        topDisplay.textContent = num1 + operand + num2 + "=";
        btmDisplay.textContent = num;
        num1 = num;
        num2 = '';
        operandKeyClicked = false;
        operand = '';
    }
    if(operandKeyClicked){
        topDisplay.textContent = num1 + operand;
    }
    if(!isNaN(key)){
        btmDisplay.textContent = num;
    }
}

function clr(){
    const btmDisplay = document.querySelector('.bottom-display');
    const topDisplay = document.querySelector('.top-display');
    topDisplay.textContent = '';
    btmDisplay.textContent = '';
    num1 = '';
    num2 = '';
    operand = '';
    operandKeyClicked = false;
}

const clear = document.querySelector('.clear');
clear.addEventListener('click',() => clr());

const numpad = document.querySelector('.numpad');
numpad.style.display = 'flex';
numpad.style.flexDirection = 'column';
numpad.style.gap = '5px';
addKeys(numpad);

let num1 = '';
let num2 = '';
let operandKeyClicked = false;
let operand = '';
