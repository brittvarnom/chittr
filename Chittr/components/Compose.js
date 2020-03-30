/* global fetch:false */

import React, { Component } from 'react'
import {
  View,
  ActivityIndicator,
  TextInput,
  Button,
  Alert,
  Text,
  AsyncStorage
} from 'react-native'

class Compose extends Component {
  constructor (props) {
    super(props)

    this.state = {
      chittrResponse: [],
      chit_id: '',
      timestamp: '',
      chit_content: '',
      user: [],
      location: '',
      user_token: '',
      user_id: '',
      content: '',
      draft: ''
    }
  }

  async postChit (timestamp, content) {
    const data = JSON.stringify({
      timestamp: timestamp,
      chit_content: content
    })

    try {
      const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.state.user_token
        },
        body: data
      })
      response.json()
      this.props.navigation.goBack()
    } catch (error) {
      console.log('>>> ERROR', error)
      Alert.alert("Couldn't post chit, please try again")
    }
  }

  setDraftValueLocally (content) {
    AsyncStorage.setItem('@DRAFTS', content)
    Alert.alert('Value stored successfully')
  }

  getValueLocally () {
    AsyncStorage.getItem('@LOGIN_TOKEN').then(value =>
      this.setState({ user_token: value })
    )
  }

  getDraftValueLocally () {
    AsyncStorage.getItem('@DRAFTS').then(value => this.setState({ draft: value }))
    console.log('>>>>>>>> DEBUG', this.state.draft)
  }

  componentDidMount () {
    this.getDraftValueLocally()
    this.getValueLocally()
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
      <View>
        <TextInput
          autoFocus
          maxLength={141}
          multiline
          onChangeText={content => {
            this.setState({ content })
          }}
          placeholder='Enter Text'
          style={{ width: 300 }}
        />
        <Button
          title='Chit'
          onPress={() => {
            console.log('>>> TOKEN', this.state.user_token)
            this.postChit(Date.now(), this.state.content)
          }}
        />
        <Button
          title='Save as draft'
          onPress={() => {
            console.log('>>> TOKEN', this.state.user_token)
            this.setDraftValueLocally(this.state.content)
            console.log('>>> DRAFTS', this.state.drafts)
          }}
        />
        <Text>{this.state.draft}</Text>
      </View>
    )
  }
}

export default Compose
