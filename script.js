const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clear = document.getElementById('clear');
const equals = document.getElementById('equals');
const clickSound = document.getElementById('clickSound');
// Append with validation
function appendToDisplay(value) {
  const lastChar = display.value.slice(-1);
  const operators = ['+', '-', '*', '/'];

  // Prevent starting with an operator or closing parenthesis
  if (display.value === '' && (operators.includes(value) || value === ')')) {
    return;
  }

  // Prevent consecutive operators
  if (operators.includes(value) && operators.includes(lastChar)) {
    return;
  }

  // Prevent unmatched closing parenthesis
  if (value === ')') {
    const openCount = (display.value.match(/\(/g) || []).length;
    const closeCount = (display.value.match(/\)/g) || []).length;
    if (closeCount >= openCount) {
      return;
    }
  }

  display.value += value;
}

// Clear display
function clearDisplay() {
  display.value = '';
}

// Evaluate expression
function calculateResult() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = 'Error';
  }
}

// Delete last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
   
    const value = button.getAttribute('data-value');
    if (value) {
      appendToDisplay(value);
    }
    clickSound.volume = 0.3;
    clickSound.currentTime = 0;
    clickSound.play();
  });
});

// Clear button
clear.addEventListener('click', clearDisplay);

// Equals button
equals.addEventListener('click', calculateResult);

// Keyboard support
document.addEventListener('keydown', function(event) {
  const key = event.key;
  const operators = ['+', '-', '*', '/'];
  const lastChar = display.value.slice(-1);

  if (!isNaN(key)) {
    appendToDisplay(key);
  } else if (operators.includes(key) || key === '(' || key === ')') {
    appendToDisplay(key);
  } else if (key === 'Enter') {
    calculateResult();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearDisplay();
  }
  clickSound.volume = 0.3;
  clickSound.currentTime = 0;
  clickSound.play();
  
});
