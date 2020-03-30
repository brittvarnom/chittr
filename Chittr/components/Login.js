/* global fetch:false */
import React, { Component } from 'react'
import {
  Text,
  View,
  ActivityIndicator,
  Button,
  AsyncStorage,
  TextInput
} from 'react-native'
import styles from '../styles/Styles'
const spacing = styles.gelSpacingUnit

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      loginMessage: ''
    }
  }

  setValueLocally () {
    AsyncStorage.setItem('@LOGIN_TOKEN', this.state.user_token)
  }

  getValueLocally () {
    AsyncStorage.getItem('@LOGIN_TOKEN').then(value =>
      this.setState({ user_token: value })
    )
  }

  deleteValueLocally () {
    try {
      AsyncStorage.removeItem('@LOGIN_TOKEN')
    } catch (exception) {}
  }

  async postUserLogin (email, password) {
    const data = JSON.stringify({
      email: email,
      password: password
    })

    try {
      const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      })
      const responseJson = await response.json()
      // sets login token and current user id
      this.setState({ user_id: responseJson.id, user_token: responseJson.token })
      console.log(
        '>>> LOGIN SUCCESS',
        `Logged in! User id: ${this.state.user_id}, Token: ${this.state.user_token}`
      )
      this.setValueLocally()
      this.props.navigation.goBack()
    } catch (error) {
      this.setState({ loginMessage: 'Failed to log in, wrong email/password' })
      console.log(
        '>>> LOGIN FAILED',
        `Failed to login - wrong email/password. ${error}`
      )
    }
  }

  async postUserLogout () {
    try {
      await fetch('http://10.0.2.2:3333/api/v0.0.5/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.state.user_token
        }
      })
    } catch (error) {
      console.log('>>> LOGOUT ERROR: ', error)
    }
    this.props.navigation.goBack()
    this.deleteValueLocally()
    this.setState({ user_token: null })
    console.log('>>> LOGOUT ', `Logged out! Token: ${this.state.user_token}`)
  }

  componentDidMount () {
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

    if (this.state.user_token !== '' && this.state.user_token !== undefined) {
      console.log('DBUEGGGGG: ', this.state.user_token)
      return (
        <View styles={(spacing, { backgroundColor: 'moccasin' })}>
          <Text>Log out of your account:</Text>
          <Button
            color='chocolate'
            title='Log out'
            onPress={() => {
              this.postUserLogout(this.state.user_token)
            }}
          />
        </View>
      )
    }

    return (
      <View style={(spacing, { alignItems: 'center' })}>
        <TextInput
          autoCompleteType='email'
          onChangeText={email => {
            this.setState({ email })
          }}
          keyboardType='email-address'
          placeholder='Email Address'
          style={(spacing, { width: 300, backgroundColor: 'moccasin' })}
        />
        <TextInput
          autoCompleteType='password'
          onChangeText={password => {
            this.setState({ password })
          }}
          placeholder='Password'
          secureTextEntry
          style={(spacing, { width: 300, backgroundColor: 'moccasin' })}
        />
        <Button
          title='Login'
          color='chocolate'
          style={{ margin: 8, width: 100 }}
          onPress={() => {
            this.postUserLogin(this.state.email, this.state.password)
          }}
        />
        <Text>{this.state.loginMessage}</Text>
      </View>
    )
  }
}

export default Login
