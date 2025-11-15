// Get the display screen element
const screen = document.getElementById('screen');

// Function to append values to the screen
function appendToScreen(value) {
    // Prevent multiple decimal points in a number
    if (value === '.') {
        const currentInput = screen.value;
        const lastNumber = currentInput.split(/[\+\-\*\/]/).pop();
        
        if (lastNumber.includes('.')) {
            return; // Don't add another decimal point
        }
    }
    
    // Prevent multiple operators in a row
    const lastChar = screen.value.slice(-1);
    const operators = ['+', '-', '*', '/'];
    
    if (operators.includes(value) && operators.includes(lastChar)) {
        // Replace the last operator with the new one
        screen.value = screen.value.slice(0, -1) + value;
        return;
    }
    
    screen.value += value;
}

// Function to clear the screen
function clearScreen() {
    screen.value = '';
}

// Function to delete the last character
function deleteLast() {
    screen.value = screen.value.slice(0, -1);
}

// Function to calculate the result
function calculate() {
    try {
        // Get the expression from the screen
        let expression = screen.value;
        
        // Replace × with * for evaluation
        expression = expression.replace(/×/g, '*');
        
        // Handle empty input
        if (expression === '') {
            return;
        }
        
        // Evaluate the expression
        const result = eval(expression);
        
        // Handle division by zero and other errors
        if (!isFinite(result)) {
            screen.value = 'Error';
            return;
        }
        
        // Display the result, removing unnecessary decimal places
        screen.value = parseFloat(result.toFixed(10)).toString();
    } catch (error) {
        // Handle any evaluation errors
        screen.value = 'Error';
    }
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Handle number keys and operators
    if (/[0-9]/.test(key)) {
        appendToScreen(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToScreen(key);
    } else if (key === '.') {
        appendToScreen('.');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearScreen();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});

// Prevent right-click context menu on the calculator
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});