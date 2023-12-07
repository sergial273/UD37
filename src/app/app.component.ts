import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UD37';
  
  expression: string = '';
  result: string = '';

  appendToExpression(value: string): void {
    this.expression += value;
  }

  calculateResult(): void {
    try {
      this.result = this.evaluateExpression(this.expression).toString();
    } catch (error) {
      this.result = 'Error';
    }
  }

  clearExpression(): void {
    this.expression = '';
    this.result = '';
  }

  deleteLast(): void {
    if (this.expression.length > 0) {
      this.expression = this.expression.slice(0, -1);
    }
  }

  evaluateExpression(expression: string): number {
    const operators = ['+', '-', '*', '/'];
    const tokens = expression.split(/([+\-*/])/).filter(token => token.trim() !== '');

    // Perform multiplication and division first
    for (let i = 0; i < operators.length; i += 2) {
      for (let j = 1; j < tokens.length; j += 2) {
        if (tokens[j] === operators[i] || tokens[j] === operators[i + 1]) {
          const leftOperand = parseFloat(tokens[j - 1]);
          const rightOperand = parseFloat(tokens[j + 1]);

          if (isNaN(leftOperand) || isNaN(rightOperand)) {
            throw new Error('Invalid expression');
          }

          if (tokens[j] === '*') {
            tokens.splice(j - 1, 3, (leftOperand * rightOperand).toString());
            j -= 2;
          } else if (tokens[j] === '/') {
            if (rightOperand === 0) {
              throw new Error('Division by zero');
            }
            tokens.splice(j - 1, 3, (leftOperand / rightOperand).toString());
            j -= 2;
          }
        }
      }
    }

    // Perform addition and subtraction
    for (let i = 0; i < operators.length; i += 2) {
      for (let j = 1; j < tokens.length; j += 2) {
        if (tokens[j] === operators[i] || tokens[j] === operators[i + 1]) {
          const leftOperand = parseFloat(tokens[j - 1]);
          const rightOperand = parseFloat(tokens[j + 1]);

          if (isNaN(leftOperand) || isNaN(rightOperand)) {
            throw new Error('Invalid expression');
          }

          if (tokens[j] === '+') {
            tokens.splice(j - 1, 3, (leftOperand + rightOperand).toString());
            j -= 2;
          } else if (tokens[j] === '-') {
            tokens.splice(j - 1, 3, (leftOperand - rightOperand).toString());
            j -= 2;
          }
        }
      }
    }

    if (tokens.length !== 1) {
      throw new Error('Invalid expression');
    }

    return parseFloat(tokens[0]);
  }
}

