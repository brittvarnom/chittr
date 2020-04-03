import React from 'react'
import { shallow } from 'enzyme'
import Feed from './Feed'

describe('OrderingPracticeContainer', () => {
  describe('component', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<Feed />)
    })

    it('should render the Drag and Drop context provider', () => {
      const flatlist = wrapper.find('Flatlist')

      expect(flatlist).toExist()
    })
  })
})
