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
        //  .reduce((a, b) => a.forEach((c, i) => b[i] === '+' ? c[i] + c[i + 1] : 
            // b[i] === '-' ? c[i] - c[i + 1] : b[i] === '*' ? c[i] * c[i + 1] :
            // b[i] === '/' ? c[i] / c[i + 1] : console.log(a, b, c)));
        // for (let i = 0; i < ops.length; i += 1) {
            // for (let j = 0; j < ops.length; j += 1) {
                // ops[j] === '+' ? numbers[i] + numbers[i+1] : ops[j] === '-' ? numbers[i] - numbers[i+1] : 
                // ops[j] === '*' ? numbers[i] * numbers[i+1] : ops[j] === '/' ? numbers[i] / numbers[i+1] : 
                // console.log(numbers, ops)
            // }
        // }

        // console.log(result);
    
    return result
}



function parseCalculationString(s) {
    let calculation = [];
    let current = '';
    for (let i = 0, ch; ch = s.charAt(i); i++) {
        if ('*/+-'.indexOf(ch) > -1) {
            if (current == '' && ch == '-') {
                current = '-';
            } else {
                calculation.push(parseFloat(current), ch);
                current = '';
            }
        } else {
            current += s.charAt(i);
        }
    }
    if (current != '') {
        calculation.push(parseFloat(current));
    }
    return calculation;
}

function calculate(calc) {
    let operators = [{'*': (a, b) => a * b, '/': (a, b) => a / b},
               {'+': (a, b) => a + b, '-': (a, b) => a - b}],
        newCalc = [],
        currentOp;
    for (let i = 0; i < operators.length; i++) {
        for (let j = 0; j < calc.length; j++) {
            if (operators[i][calc[j]]) {
                currentOp = operators[i][calc[j]];
            } else if (currentOp) {
                newCalc[newCalc.length - 1] = 
                    currentOp(newCalc[newCalc.length - 1], calc[j]);
                currentOp = null;
            } else {
                newCalc.push(calc[j]);
            }
            console.log(newCalc);
        }
        calc = newCalc;
        newCalc = [];
    }
    if (calc.length > 1) {
        console.log('Error!');
        return calc;
    } else {
        return calc[0];
    }
}


const printer = () => {
    const lastChar = result.charAt(result.length-1);
    isNaN(lastChar) === true ? display.value = `Túl sok '${lastChar}' jel` : display.value = calculate(parseCalculationString(result));
    // console.log(result);
    // console.log(lastChar);
};



addEvent();