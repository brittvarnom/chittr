/**
 * @format
 */

import 'react-native'
import renderer from 'react-test-renderer'
import React from 'react'
import App from '../App'

describe('The app component', () => {
  it('renders correctly', () => {
    renderer.create(<App />)
  })
})
