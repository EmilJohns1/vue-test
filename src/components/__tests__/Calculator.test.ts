import { assert, test } from 'vitest';
import { mount } from '@vue/test-utils';
import Calculator from '@/components/Calculator.vue';

test('Calculator: Test handleButtonClick method', async () => {
  const wrapper = mount(Calculator);

  const calculator = wrapper.vm as any;

  calculator.handleButtonClick('7');
  assert.equal(calculator.expression, '7');

  calculator.handleButtonClick('8');
  assert.equal(calculator.expression, '78');

  calculator.handleButtonClick('+');
  assert.equal(calculator.expression, '78+');

  calculator.handleButtonClick('5');
  assert.equal(calculator.expression, '78+5');

  // Test equals
  calculator.handleButtonClick('=');
  assert.equal(calculator.expression, ''); // Assuming the result is 83
  assert.equal(calculator.answers[calculator.answers.length - 1], '78+5 = 83');
  assert.equal(calculator.answers.length, 1);

  // Test clear
  calculator.handleButtonClick('C');
  assert.equal(calculator.expression, '');

  // Test deletion
  calculator.handleButtonClick('1');
  calculator.handleButtonClick('2');
  calculator.handleButtonClick('DEL');
  assert.equal(calculator.expression, '1');

  // Test division by zero
  calculator.handleButtonClick('/');
  calculator.handleButtonClick('0');
  calculator.handleButtonClick('=');
  assert.equal(calculator.expression, '');
  assert.equal(calculator.answers[calculator.answers.length - 1], 'undefined');

  // Test using 'ans'
  calculator.handleButtonClick('7');
  calculator.handleButtonClick('+');
  calculator.handleButtonClick('ans');
  assert.equal(calculator.expression, '7+undefined'); // Assuming the previous result was 83

  wrapper.unmount();

});
