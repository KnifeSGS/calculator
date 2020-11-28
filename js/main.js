'use strict';

const buttons = document.querySelectorAll('button');
const monitor = document.querySelector('.calculator__monitor');
const display = document.querySelector('.calculator__display');
const resultButton = document.querySelector('.resultBtn')

const addEvent = () => {
    buttons.forEach(button => {
        button.addEventListener('click', getButtonPress)
    })
};

const getButtonPress = () => {
    const clickedButtonValue = event.target.value;

    clickedButtonValue === '=' ? ((monitor.textContent === '') ? 'return' : monitor.textContent = count(monitor.textContent)) :
    clickedButtonValue === 'C' ? monitor.textContent = '' : monitor.textContent += clickedButtonValue;  
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

let result = [];

const calcArr = () => {
    result = [numbers, ops]
        .reduce((r, a) => (a.forEach((a, i) => (r[i] = r[i] || []).push(a)), r), [])
        .reduce((a, b) => a.concat(b))
        .join('');

    
    return result
}



const printer = () => {
    const lastChar = result.charAt(result.length-1);
    isNaN(lastChar) === true ? display.value = `Túl sok '${lastChar}' jel` : display.value = result;
    console.log(result);
    console.log(lastChar);
};



addEvent();