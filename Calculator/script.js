class Calculator {

    constructor(previousElement, currentElement) {
        this.previousElement = previousElement;
        this.currentElement = currentElement;
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete() {
       this.currentOperand = this.currentOperand.slice(0, -1);
    }

    appendNumber(number) {
        if (this.currentOperand.includes(".") && number === ".") {
            return
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        let output = 0;
        if (this.currentOperand.length === 0) {
            return
        } else {
            if (this.previousOperand.length === 0) {
                this.previousOperand = this.currentOperand.toString() + operation.toString();
                this.currentOperand = '';
            } else {
                if (this.previousOperand.charAt(this.previousOperand.length-1) === '+') {
                    output = parseFloat(this.previousOperand) + parseFloat(this.currentOperand);
                    this.previousOperand = output.toString()+operation;
                    this.currentOperand = '';
                } else if (this.previousOperand.charAt(this.previousOperand.length-1) === '-') {
                    output = parseFloat(this.previousOperand) - parseFloat(this.currentOperand);
                    this.previousOperand = output.toString()+operation;
                    this.currentOperand = '';
                } else if (this.previousOperand.charAt(this.previousOperand.length-1) === '*') {
                    output = parseFloat(this.previousOperand) * parseFloat(this.currentOperand) ;
                    this.previousOperand = output.toString()+operation;
                    this.currentOperand = '';
                } else {
                    output = parseFloat(this.previousOperand)/parseFloat(this.currentOperand) ;
                    this.previousOperand = output.toString()+operation;
                    this.currentOperand = '';
                }
            }
        }
    }

    doOperand() {
        let output = 0;
        if (this.previousOperand.length === 0 || this.currentOperand.length === 0) {
            return
        } else {
            if (this.previousOperand.charAt(this.previousOperand.length-1) === '+') {
                output = parseFloat(this.previousOperand) + parseFloat(this.currentOperand);
                this.currentOperand = output.toString();
                this.previousOperand = '';
            } else if (this.previousOperand.charAt(this.previousOperand.length-1) === '-') {
                output = parseFloat(this.previousOperand) - parseFloat(this.currentOperand);
                this.currentOperand = output.toString();
                this.previousOperand = '';
            } else if (this.previousOperand.charAt(this.previousOperand.length-1) === '*') {
                output = parseFloat(this.previousOperand) * parseFloat(this.currentOperand) ;
                this.currentOperand = output.toString();
                this.previousOperand = '';
            } else {
                output = parseFloat(this.previousOperand)/parseFloat(this.currentOperand) ;
                this.currentOperand = output.toString();
                this.previousOperand = '';
            }
        }
    }

    updateDisplay() {
        this.currentElement.innerText = this.currentOperand;
        this.previousElement.innerText = this.previousOperand;
    }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operandButtons = document.querySelectorAll('[data-operand]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-allClear]');
const currentElement = document.querySelector('[data-currentOperand]');
const previousElement = document.querySelector('[data-previousOperand]');


const calculator = new Calculator(previousElement, currentElement);
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () =>{
    calculator.clear();
    calculator.updateDisplay();
})

operandButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', () => {
    calculator.doOperand();
    calculator.updateDisplay();
})