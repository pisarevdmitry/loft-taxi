import reducer from './Profile'
import { setProfile, profileFailure } from './actions'
const randomAction = {
  type: `RANDOM_ACTION_${parseInt(Math.random() * 1000, 10)}`
}

describe('Reducer Profile', () => {
  const state0 = reducer(undefined, randomAction)

  describe('onSucces', () => {
    const testProfile = { id: 'testid', email: 'test@email.com' }
    const result = reducer(state0, setProfile(testProfile))

    it('profile has profile data', () => {
      expect(result.profile).toEqual(testProfile)
    })
    it('loading be false', () => {
      expect(result.loading).toBeFalsy()
    })
  })

  describe('onFailure', () => {
    const result = reducer(state0, profileFailure())

    it('profile to be null', () => {
      expect(result.profile).toEqual(null)
    })
    it('loading be false', () => {
      expect(result.loading).toBeFalsy()
    })
  })
})
