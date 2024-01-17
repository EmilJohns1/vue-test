<template>
    <div class="calculator-container">
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
      </div>
  
      <div id="output-area" class="output-area">
        {{ expression }}
        <div v-for="(answer, index) in reversedAnswers" :key="index" class="previous-answer">
            {{ answer }}
            <div class="answer-line"></div>
        </div>
        </div>
    </div>
  </template>
  
  <script>

  import * as math from "mathjs";

  export default {
    data() {
      return {
        expression: "",
        lastOperator: "",
        answers: [],
      };
    },
    methods: {
        handleButtonClick(value) {
            if (value === 'C') {
                this.expression = '';
                return;
            } else if (value === '=') {
                try {
                    console.log(this.expression.toString().slice(-2));
                    if (this.expression.toString().slice(-2) === "/0") {
                        this.expression = "undefined";
                        this.answers.push(this.expression);
                        this.expression = "";
                    } else {
                    const result = math.evaluate(this.expression).toString();
                    this.answers.push(this.expression + ' = ' + result);
                    this.expression = "";
                    }
                } catch (error) {
                    this.expression = "undefined";
                    this.answers.push(this.expression);
                    this.expression = "";
                }
            } else {
                this.expression += value;
            }
        }
    },
    computed: {
  reversedAnswers() {
    return this.answers.slice().reverse();
  },
},
};
  </script>
  
  <style scoped>
  .calculator-container {
    display: flex;
    justify-content: space-between;
  }
  
  #calculator {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 10px;
    border: 2px solid #000;
    width: 200px;
    margin: 20px;
    padding: 5px;
    border-radius: 5px;
    background: linear-gradient(to bottom right, #87CEEB, #FF69B4);
  }
  
  .grid-square {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #000;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 1.5rem;
  }
  
  #output-area {
    width: 200px;
    margin: 20px;
    padding: 10px;
    border: 2px solid #000;
    border-radius: 5px;
    background: linear-gradient(to bottom right, #87CEEB, #FF69B4);
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 1.2rem;
  }
  
  .previous-answer {
    margin-top: 10px;
  }

  .answer-line {
  height: 1px;
  background-color: #000;
  margin: 5px 0;
  }
  </style>
  