/* global fetch:false */
import React, { Component } from 'react'
import { View, ActivityIndicator, FlatList, AsyncStorage } from 'react-native'
import Chit from './Chit'
import styles from '../styles/Styles'

const style = { spacing: styles.gelSpacingUnit, background: styles.background }

class Feed extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user_token: ''
    }
  }

  getValueLocally () {
    AsyncStorage.getItem('@LOGIN_TOKEN').then(value =>
      this.setState({ user_token: value })
    )
    console.log('TOKEN RETRIEVED: ', this.state.user_token)
  }

  getLatestChits () {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          responseJ: responseJson
        })
      })
      .catch(error => {
        console.log('>>> ERROR', error)
      })
  }

  componentDidMount () {
    this.getValueLocally()
    this.getLatestChits()
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={{ style, flexDirection: 'row', backgroundColor: 'chocolate' }}>
        {/* List rendering all chits */}
        <FlatList
          data={this.state.responseJ}
          // Map each item
          renderItem={({ item }) => (
            <View>
              {/* Individual chit component */}
              <Chit item={item} />
            </View>
          )}
          keyExtractor={({ id }, index) => id}
        />
      </View>
    )
  }
}

export default Feed
