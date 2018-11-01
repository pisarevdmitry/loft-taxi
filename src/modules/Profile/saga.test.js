import { profileFlow, profileRequestFlow } from './sagas'
import { put, call } from 'redux-saga/effects'
import { authSuccess } from '../Auth'
import { setProfile, profileFailure } from './actions'
import { load } from '../../util/localstorage'
import { request } from '../../util/network'

const testProfile = { id: 'testid', email: 'test@email.com' }

it('profileFlow should yeild put setProfile', () => {
  const iterator = profileFlow(authSuccess(testProfile))
  expect(iterator.next().value).toEqual(put(setProfile(testProfile)))
})

describe('profileRequestFlow', () => {
  const iterator = profileRequestFlow()
  const testToken = 'testToken'
  const testFetch = {
    path: '/user/me',
    method: 'GET',
    token: testToken
  }
  const firstYield = iterator.next().value
  const secondYield = iterator.next(testToken).value
  const thirdYield = iterator.next(testProfile).value

  it('first yield must take data from localstorage', () => {
    expect(firstYield).toEqual(call(load))
  })

  it('second yield must take fetch data from backend', () => {
    expect(secondYield).toEqual(call(request, testFetch))
  })

  it('third yield must take put authSuccess', () => {
    expect(thirdYield).toEqual(put(authSuccess(testProfile)))
  })

  it('Error must put profileFailure', () => {
    const iterator = profileRequestFlow()
    const firstYield = iterator.next().value
    const error = iterator.throw(new Error('testError')).value

    expect(error).toEqual(put(profileFailure()))
  })
})
