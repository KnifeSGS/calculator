'use strict';

const buttons = document.querySelectorAll('button');
const monitor = document.querySelector('.calculator__monitor');

const addEvent = () => {
    buttons.forEach(button => {
        button.addEventListener('click', calculate)
    })
};

const calculate = () => {
    const clickedButtonValue = event.target.value;
    // írjuk át terneryre
    if (clickedButtonValue === '=') {
        if (monitor.textContent === ''){
            return;
        } else {
            monitor.textContent = count(monitor.textContent)
        }
    } else if (clickedButtonValue === 'C') {
        monitor.textContent = '';
    } else {
        monitor.textContent += clickedButtonValue;
    }
}

const count = (monitorValue) => {
    separatorOperators(monitorValue);
    separatorNumbers(monitorValue);
    numberizer();
    calcArr(monitorValue);
    joiner();
    printer();
    
    //textContent et stringbe daraboljuk
    //darabokat számoljuk
    //monitorra kiírjuk
    
}

let ops = '';
let numbers = '';
let result = '';
let array = '';

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
    numbers = separatorNumbers().map(item => parseInt(item));
    return numbers;
};

let separated = ';'

const calcArr = () => {
    separated = monitor.textContent;
    // array = numbers.concat(ops);
    console.log(separated);


    return separated
}

const joiner = () => {
    
};

const printer = () => {
    monitor.textContent = 'error';
    // console.log(result);
    return;
};



addEvent();