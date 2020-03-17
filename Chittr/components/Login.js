import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Button, TextInput } from 'react-native';

class Login extends Component {

    constructor (props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loginMessage: ''
        };
    }

    postUserLogin(email, password) {
        const data = JSON.stringify({
            email: email,
            password: password
        });

        return fetch('http://10.0.2.2:3333/api/v0.0.5/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //sets login token and current user id
                this.setState({ user_id: responseJson.id, user_token: responseJson.token })
                console.log('>>> LOGIN SUCCESS', `Logged in! User id: ${this.state.user_id}, Token: ${this.state.user_token}`)
                this.setState({ loginMessage: '' });
            })
            .catch((error) => {
                this.setState({ loginMessage: 'Failed to log in, wrong email/password' });
                console.log('>>> LOGIN FAILED', `Failed to login - wrong email/password. ${error}`);
            })
    }

    render() {
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
                    autoCompleteType='email'
                    style={{ width: 300 }}
                    placeholder='Email Address'
                    keyboardType='email-address'
                    onChangeText={(email) => { this.setState({ email }) }}>
                </TextInput>
                <TextInput
                    style={{ width: 300 }}
                    placeholder='Password'
                    autoCompleteType='password'
                    secureTextEntry={true}
                    onChangeText={(password) => { this.setState({ password }) }}>
                </TextInput>
                <Button title='Login' style={{ margin: 8 }} onPress={() => { this.postUserLogin(this.state.email, this.state.password) }}></Button>
                <Text>{this.state.loginMessage}</Text>
            </View >
        );
    }
}

export default Login;
