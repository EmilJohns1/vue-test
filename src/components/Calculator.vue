<template>
  <div class="calculator-container" @keydown="handleKeyPress" tabindex="0">
    <div id="calculator" class="grid">
      <div class="grid-square" @click="handleButtonClick('7')">7</div>
      <div class="grid-square" @click="handleButtonClick('8')">8</div>
      <div class="grid-square" @click="handleButtonClick('9')">9</div>
      <div class="grid-square" @click="handleButtonClick('-')">-</div>
      <div class="grid-square" @click="handleButtonClick('4')">4</div>
      <div class="grid-square" @click="handleButtonClick('5')">5</div>
      <div class="grid-square" @click="handleButtonClick('6')">6</div>
      <div class="grid-square" @click="handleButtonClick('+')">+</div>
      <div class="grid-square" @click="handleButtonClick('1')">1</div>
      <div class="grid-square" @click="handleButtonClick('2')">2</div>
      <div class="grid-square" @click="handleButtonClick('3')">3</div>
      <div class="grid-square" @click="handleButtonClick('=')">=</div>
      <div class="grid-square" @click="handleButtonClick('0')">0</div>
      <div class="grid-square" @click="handleButtonClick('*')">*</div>
      <div class="grid-square" @click="handleButtonClick('/')">/</div>
      <div class="grid-square" @click="handleButtonClick('C')">C</div>
      <div class="grid-square"></div>
      <div class="grid-square" @click="handleButtonClick('.')">.</div>
      <div class="grid-square" @click="handleButtonClick('DEL')">DEL</div>
      <div class="grid-square" @click="handleButtonClick('ans')">ans</div>
    </div>

    <div id="output-area" class="output-area">
      <div class="current-expression">
        <input type="text" v-model="expression" readonly />
      </div>

      <div v-for="(answer, index) in reversedAnswers" :key="index" class="previous-answer">
        {{ answer }}
        <div class="answer-line"></div>
      </div>
    </div>
    <router-link id="router-link" to="/contactform">
      <button id="feedback-button">Give us feedback!</button>
    </router-link>
  </div>
</template>

<script>
import * as math from 'mathjs'

export default {
  data() {
    return {
      expression: '',
      lastOperator: '',
      answers: []
    }
  },
  methods: {
    pushAnswer() {
      if (this.answers.length < 10) {
        this.answers.push(this.expression)
        this.expression = ''
      } else {
        this.answers.shift()
        this.answers.push(this.expression)
        this.expression = ''
      }
    },
    handleButtonClick(value) {
      if (value === 'C') {
        this.expression = ''
        return
      } else if (value === 'DEL') {
        let temp = this.expression.substring(0, this.expression.length - 1)
        this.expression = temp
        console.log(this.expression)
        return
      } else if (value === 'ans') {
        if (this.answers.length === 0) {
          return
        } else {
          // Extract the result from the last answer
          const lastAnswer = this.answers[this.answers.length - 1]
          const resultIndex = lastAnswer.lastIndexOf('=') + 1
          const result = lastAnswer.slice(resultIndex).trim()

          // Append the result to the current expression
          this.expression += result

          return
        }
      } else if (value === '=') {
        if (this.expression === '') {
          return
        }
        try {
          console.log(this.expression.toString().slice(-2))
          if (this.expression.includes('/0')) {
            this.expression = 'undefined'
            pushAnswer()
          } else {
            const result = math.evaluate(this.expression).toString()
            this.expression = this.expression + ' = ' + result
            this.pushAnswer()
          }
        } catch (error) {
          this.expression = 'undefined'
          this.answers.push(this.expression)
          this.expression = ''
        }
      } else {
        this.expression += value
      }
    },
    handleKeyPress(event) {
      const key = event.key
      console.log(key)

      if (key === 'Backspace') {
        event.preventDefault() // Prevent the default behavior of the key event
        this.handleButtonClick('DEL')
      }

      if (key === 'C') {
        this.handleButtonClick('C')
      }

      if (key === '=' || event.keyCode === 13) {
        this.handleButtonClick('=')
      }

      if (this.expression.length > 17) {
        return
      }
      // Allow only specific keys
      if (/[\d*\/\b\s=.,+\-]/.test(key)) {
        event.preventDefault() // Prevent the default behavior of the key event
        if (key === ',') {
          this.handleButtonClick('.')
        } else this.handleButtonClick(key)
      } else {
        return
      }
    }
  },
  computed: {
    reversedAnswers() {
      return this.answers.slice().reverse()
    }
  }
}
</script>

<style scoped>
#router-link {
  display: flex;
  justify-content: center;
  max-width: fit-content;
  max-height: 100px;
}

#calculator {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr); /* Adjusted the number of rows to 5 */
  gap: 10px;
  border: 2px solid #000;
  width: 360px; /* Adjusted the width to accommodate the additional row */
  margin: 20px auto; /* Center the calculator horizontally */
  padding: 5px;
  border-radius: 5px;
  background: linear-gradient(to bottom right, #87ceeb, #ff69b4);
}

.grid-square {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #000;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 1.5rem;
}

#output-area {
  width: 240px; /* Match the calculator width */
  margin: 20px auto; /* Center the output area horizontally */
  padding: 10px;
  border: 2px solid #000;
  border-radius: 5px;
  background: linear-gradient(to bottom right, #87ceeb, #ff69b4);
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 1.2rem;
  max-height: 365.96px;
  overflow-y: scroll;
}

.calculator-container {
  display: flex;
  justify-content: center; /* Center the calculator container horizontally */
  gap: 20px;
}

.calculator-container:focus {
  outline: none;
}

.previous-answer {
  margin-top: 10px;
}

.answer-line {
  height: 1px;
  background-color: #000;
  margin: 5px 0;
}

#feedback-button {
  width: 240px;
  margin: 20px auto;
  padding: 10px;
  border: 2px solid #000;
  border-radius: 5px;
  background-color: #4caf50;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 1.2rem;
  cursor: pointer;
}

#feedback-button:hover {
  background-color: #3e8e41;
}
</style>
