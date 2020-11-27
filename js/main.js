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
        if (monitor.textContent !== '') {
            monitor.textContent = count(monitor.textContent)
        }
    } else if (clickedButtonValue === 'C') {
        monitor.textContent = '';
    } else {
        monitor.textContent += clickedButtonValue;
    }
}

const count = () => {
    separatorOperators();
    separatorNumbers();
    numberizer();
    joiner();
    printer();
    //textContent et stringbe daraboljuk
    //darabokat számoljuk
    //monitorra kiírjuk

}

let ops = '';
let numbers = '';
let result = '';

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

const joiner = () => {
    for (let i = 0; i < numbers.length; i += 1) {
        for (let j = 0; j < ops.length; j +=1) {
            result = numbers[i] + ops[j] + numbers[i += 1]
        }
    }
    return result
};

const printer = () => {
    monitor.textContent = 'error';
    // console.log(result);
    return monitor.textContent
};



addEvent();