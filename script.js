const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let operator = null;
let previousValue = '';
let expression = '';

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const value = this.textContent;

        if (!isNaN(value) || value === '.') {
            currentInput += value;
            expression += value;
            display.value = expression;
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput === '' && previousValue === '') return;

            if (previousValue !== '' && currentInput !== '') {
                calculate();
                expression = display.value;
            }
            operator = value;
            expression += ' ' + operator + ' ';
            previousValue = display.value;
            currentInput = '';
            display.value = expression;
        } else if (value === '=') {
            if (currentInput === '') return;
            if (previousValue !== '') {
                calculate();
                operator = null;
                previousValue = '';
                expression = display.value;
            }
        } else if (value === 'C') {
            currentInput = '';
            operator = null;
            previousValue = '';
            expression = '';
            display.value = '';
        } 
         else if (value === '%') {
            if (currentInput !== '') {
                currentInput = (parseFloat(currentInput) / 100).toString();
                expression = expression.slice(0, expression.lastIndexOf(parseFloat(currentInput) * 100 + '%')) + currentInput;
                display.value = currentInput;
            }
        } else if (value === '√') {
            if (currentInput !== '') {
                const sqrtValue = Math.sqrt(parseFloat(currentInput));
                if (isNaN(sqrtValue)) {
                    display.value = 'Error: Invalid Input'; // Handle negative input for square root
                    currentInput = '';
                    expression = '';
                } else {
                    currentInput = sqrtValue.toString();
                    expression = '√(' + expression + ')';
                    display.value = currentInput;
                }
            } else if (display.value !== '' && !isNaN(display.value)) {
                const sqrtValue = Math.sqrt(parseFloat(display.value));
                if (isNaN(sqrtValue)) {
                    display.value = 'Error: Invalid Input';
                    currentInput = '';
                    expression = '';
                } else {
                    display.value = sqrtValue.toString();
                    expression = '√(' + expression + ')';
                    currentInput = display.value;
                }
            }
        }
    });
});

function calculate() {
    let result;
    const num1 = parseFloat(previousValue);
    const num2 = parseFloat(currentInput);

    if (isNaN(num1) || isNaN(num2)) return;

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                display.value = 'Error: Division by zero';
                return;
            }
            result = num1 / num2;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    display.value = currentInput;
}