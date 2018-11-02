import reducer from './Auth'

import {
  authSuccess,
  authFailure,
  authRequest,
  registrationRequest
} from './actions'

const randomAction = {
  type: `RANDOM_ACTION_${parseInt(Math.random() * 1000, 10)}`
}

describe('Reducer Auth', () => {
  const state0 = reducer(undefined, randomAction)
  describe('onAuthRequest', () => {
    const result = reducer(state0, authRequest())

    it(' proccessing become true', () => {
      expect(result.proccessing).toBeTruthy()
    })
  })

  describe('on registrationRequest', () => {
    const result = reducer(state0, registrationRequest())

    it(' proccessing become true', () => {
      expect(result.proccessing).toBeTruthy()
    })
  })

  describe('onSucess', () => {
    const result = reducer(state0, authSuccess())

    it('stage become truthy', () => {
      expect(result.state).toBeTruthy()
    })

    it(' proccessing become false', () => {
      expect(result.proccessing).toBeFalsy()
    })

    it('error become null', () => {
      expect(result.error).toBe(null)
    })
  })

  describe('onFailure', () => {
    const testError = 'test error'
    const result = reducer(state0, authFailure(testError))

    it('stage become false', () => {
      expect(result.state).toBeFalsy()
    })
    it(' proccessing become false', () => {
      expect(result.proccessing).toBeFalsy()
    })
    it('error has error message', () => {
      expect(result.error).toBe(testError)
    })
  })
})
