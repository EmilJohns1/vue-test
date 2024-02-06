import { assert, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Calculator from '@/components/Calculator.vue'

test('Calculator: Test handleButtonClick method', async () => {
  const wrapper = mount(Calculator)

  const calculator = wrapper.vm as any

  calculator.handleButtonClick('7')
  assert.equal(calculator.expression, '7')

  calculator.handleButtonClick('8')
  assert.equal(calculator.expression, '78')

  calculator.handleButtonClick('+')
  assert.equal(calculator.expression, '78+')

  calculator.handleButtonClick('5')
  assert.equal(calculator.expression, '78+5')

  calculator.handleButtonClick('=')
  assert.equal(calculator.expression, '')
  assert.equal(calculator.answers[calculator.answers.length - 1], '78+5 = 83')
  assert.equal(calculator.answers.length, 1)

  calculator.handleButtonClick('C')
  assert.equal(calculator.expression, '')

  calculator.handleButtonClick('1')
  calculator.handleButtonClick('2')
  calculator.handleButtonClick('DEL')
  assert.equal(calculator.expression, '1')

  calculator.handleButtonClick('/')
  calculator.handleButtonClick('0')
  calculator.handleButtonClick('=')
  assert.equal(calculator.expression, '')
  assert.equal(calculator.answers[calculator.answers.length - 1], 'undefined')

  calculator.handleButtonClick('7')
  calculator.handleButtonClick('+')
  calculator.handleButtonClick('ans')
  assert.equal(calculator.expression, '7+undefined')

  wrapper.unmount()
})
