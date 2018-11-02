import {
  registrationRequestHandler,
  authRequestHandler,
  authFlow
} from './sagas'
import { put, call } from 'redux-saga/effects'
import { request } from '../../util/network'
import { save } from '../../util/localstorage'
import { authSuccess, authFailure } from './actions'
import parseError from '../../util/parseError'

const action = {
  type: 'testaction',
  payload: 'testvalue'
}
const testPath = 'path'
it('registrationRequestHandler must call authFlow', () => {
  const iterator = registrationRequestHandler(testPath, action)
  expect(iterator.next().value).toEqual(
    call(authFlow, action.payload, testPath)
  )
})

it('authRequestHandler must call authFlow', () => {
  const iterator = authRequestHandler(testPath, action)
  expect(iterator.next().value).toEqual(
    call(authFlow, action.payload, testPath)
  )
})

describe('authFlow', () => {
  const iterator = authFlow(action.payload, testPath)
  const testFetchRequest = {
    path: testPath,
    method: 'POST',
    body: JSON.stringify(action.payload)
  }
  const testResponce = {
    token: 'testToken',
    user: { id: 'testid', email: 'test@email.com' }
  }

  it('first yield must call fetchRequest', () => {
    const result = iterator.next().value

    expect(result).toEqual(call(request, testFetchRequest))
  })

  it('second yield must call localstorage save', () => {
    const testToken = { token: 'testToken' }
    const result = iterator.next(testResponce).value

    expect(result).toEqual(call(save, testResponce.token))
  })

  it('third yield must put authSuccee', () => {
    const testData = { id: 'testid', email: 'test@email.com' }

    const result = iterator.next().value

    expect(result).toEqual(put(authSuccess(testResponce.user)))
  })
  
  describe('Error must put profileFailure', () => {
    const iterator = authFlow(action.payload, testPath)
    const firstYield = iterator.next().value
    const error = { json: true }
    const iteratorFailure = iterator.throw(error)

    it('first yield must call parseError', () => {
      expect(iteratorFailure.value).toEqual(call(parseError, error))
    })

    it('next yield shoul put authFailure', () => {
      const message = { message: 'test error' }
      const result = iterator.next(message).value

      expect(result).toEqual(put(authFailure(message.message)))
    })
  })
})
