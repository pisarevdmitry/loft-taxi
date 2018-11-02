import React from 'react'
import Form from './Form'
import { mount } from 'enzyme'

const fields = [
  {
    name: 'email',
    label: 'Почта',
    type: 'text'
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password'
  }
]
const validate = () => 'test validate'
const handleSubmit = () => 'testhandleSubmit'
const wrapper = mount(
  <Form
    fields={fields}
    buttonName="testbutton"
    validate={validate}
    handleSubmit={handleSubmit}
    disabled={false}
  />
)

describe('on change', () => {
  it('change state if type on email field', () => {
    const testType = 'foo'
    wrapper
      .find('input[name="email"]')
      .simulate('change', { target: { name: 'email', value: testType } })
    expect(wrapper.state().fields.email).toEqual(testType)
  })
  it('change state if type on password field', () => {
    const testType = 'bar'
    wrapper
      .find('input[name="password"]')
      .simulate('change', { target: { name: 'password', value: testType } })
    expect(wrapper.state().fields.password).toEqual(testType)
    wrapper.unmount()
  })
})
