import React from 'react'
import { Profile } from './Profile'
import { shallow } from 'enzyme'

const testProfile = { id: 'testid', email: 'test@email.com' }

const wrapper = shallow(<Profile profile={testProfile} />)

describe('render Profile', () => {
  it('has correct profile id', () => {
    expect(wrapper.find('p').contains(testProfile.id)).toBeTruthy()
  })
  it('has correct profile email', () => {
    expect(wrapper.find('p').contains(testProfile.email)).toBeTruthy()
  })
})
