import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Button, AsyncStorage, Alert, TextInput, CheckBox, TouchableOpacity } from 'react-native';

class Login extends Component {

    constructor (props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loginMessage: ''
        };
    }

    setValueLocally = () => {
        AsyncStorage.setItem('@LOGIN_TOKEN', this.state.user_token);
        Alert.alert("Value stored successfully");
    }

    getTokenlocally = () => {
        AsyncStorage.getItem('@LOGIN_TOKEN').then((value) => this.setState({ user_token: value }));
    }

    deleteValueLocally = () => {
        try {
            AsyncStorage.removeItem('@LOGIN_TOKEN');
        }
        catch (exception) {
            return;
        }
    }

    postUserRegister(gName, fName, email, password) {
        const data = JSON.stringify({
            given_name: gName,
            family_name: fName,
            email: email,
            password: password
        });

        return fetch('http://10.0.2.2:3333/api/v0.0.5/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //sets login token and current user id
                console.log('>>> REGISTER SUCCESS', `Account created! Account id: ${responseJson.id}`);
            })
            .catch((error) => {
                this.setState({ loginMessage: 'Failed to register, fill all fields' });
                console.log('>>> REGISTER FAILED: ', error);
            })
    }

    componentDidMount() {
        this.getTokenlocally();
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            )
        }

        if (this.state.user_token != "" && this.state.user_token != undefined) {
            console.log('DBUEGGGGG: ', this.state.user_token);
            return <View>
                <Text>You are already logged in :)</Text>
                <Button title='Log out' onPress={() => { this.postUserLogout(this.state.user_token) }} />
            </View>
        }

        return (
            <View>
                <TextInput
                    autoCompleteType='name'
                    onChangeText={(gName) => { this.setState({ gName }) }}
                    placeholder='Given Name'
                    style={{ width: 300 }}>
                </TextInput>
                <TextInput
                    onChangeText={(fName) => { this.setState({ fName }) }}
                    placeholder='Family Name'
                    style={{ width: 300 }}>
                </TextInput>
                <TextInput
                    autoCompleteType='email'
                    onChangeText={(email) => { this.setState({ email }) }}
                    keyboardType='email-address'
                    placeholder='Email Address'
                    style={{ width: 300 }}>
                </TextInput>
                <TextInput
                    autoCompleteType='password'
                    onChangeText={(password) => { this.setState({ password }) }}
                    placeholder='Password'
                    style={{ width: 300 }}
                    secureTextEntry={true}>
                </TextInput>
                <Button title='Register' style={{ margin: 8 }} onPress={() => { this.postUserRegister(this.state.gName, this.state.fName, this.state.email, this.state.password) }}></Button>
                <Text>{this.state.loginMessage}</Text>
            </View >
        );
    }
}

export default Login;
