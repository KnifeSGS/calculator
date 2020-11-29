'use strict';

const buttons = document.querySelectorAll('.btn');
const monitor = document.querySelector('.calculator__monitor');
const display = document.querySelector('.calculator__display');
const resultButton = document.querySelector('.resultBtn')

const addEvent = () => {
    buttons.forEach(button => {
        button.addEventListener('click', getButtonPress)
    })
};
const addEventResult = () => {
        resultButton.addEventListener('click', calculateResult)
};

const getButtonPress = () => {
    const clickedButtonValue = event.target.value;
    clickedButtonValue === 'C' ? (monitor.textContent = '', display.textContent = '') : monitor.textContent += clickedButtonValue;  
};

const calculateResult = () => {
    const resultButtonValue = event.target.value;
    resultButtonValue === '=' ? ((monitor.textContent === '') ? 'return' : monitor.textContent = count(monitor.textContent)) : 'return';
}

const count = () => {
    separatorOperators();
    separatorNumbers();
    numberizer();
    calcArr();
    printer();
}

let ops = '';
let numbers = '';

const separatorOperators = () => {
    const separated = monitor.textContent.split(' ');
    ops = separated.filter(item => Number.isInteger(parseInt(item)) !== true);
    return ops;
};

const separatorNumbers = () => {
    const separated = monitor.textContent.split(' ');
    const nums = separated.filter(item => Number.isInteger(parseInt(item)) === true);
    return nums;
};

const numberizer = () => {
    numbers = separatorNumbers().map(item => parseFloat(item));
    return numbers;
};

let displayedCalc = [];

const calcArr = () => {
    displayedCalc = [numbers, ops]
        .reduce((r, a) => (a.forEach((a, i) => (r[i] = r[i] || []).push(a)), r), [])
        .reduce((a, b) => a.concat(b));
    return displayedCalc
}

const calculate = (inputArr) => {
    let operators = [{'*': (a, b) => a * b,
                      '/': (a, b) => a / b},
                     {'+': (a, b) => a + b, 
                      '-': (a, b) => a - b}];
    let newCalc = [];
    let currentOp;
    for (let i = 0; i < operators.length; i += 1) {
        for (let j = 0; j < inputArr.length; j += 1) {
            if (operators[i][inputArr[j]]) {
                currentOp = operators[i][inputArr[j]];
            } else if (currentOp) {
                newCalc[newCalc.length - 1] = 
                    currentOp(newCalc[newCalc.length - 1], inputArr[j]);
                currentOp = null;
            } else {
                newCalc.push(inputArr[j]);
            }
        }
        inputArr = newCalc;
        newCalc = [];
    }
    if (inputArr.length > 1) {
        return inputArr;
    } else {
        return inputArr[0];
    }
}

const printer = () => {
    const lastChar = displayedCalc.join('').charAt(displayedCalc.join('').length - 1);
    isNaN(lastChar) === true ? display.textContent = `Túl sok '${lastChar}' jel` : display.textContent = calculate(displayedCalc);
};

addEvent();
addEventResult();