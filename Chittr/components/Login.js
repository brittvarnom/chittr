import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Button, AsyncStorage, Alert, TextInput, CheckBox, TouchableOpacity } from 'react-native';
import Register from './Register';

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

    getValueLocally = () => {
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

    async postUserLogin(email, password) {
        const data = JSON.stringify({
            email: email,
            password: password
        });

        try {
            const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data
            });
            const responseJson = await response.json();
            //sets login token and current user id
            this.setState({ user_id: responseJson.id, user_token: responseJson.token });
            console.log('>>> LOGIN SUCCESS', `Logged in! User id: ${this.state.user_id}, Token: ${this.state.user_token}`);
            this.setValueLocally();
            console.log('>>>>>>>>>>>>>>>>', this.props.navigation)
            this.props.navigation.goBack();
        }
        catch (error) {
            this.setState({ loginMessage: 'Failed to log in, wrong email/password' });
            console.log('>>> LOGIN FAILED', `Failed to login - wrong email/password. ${error}`);
        }
    }

    async postUserLogout() {
        console.log('LOGOUT DEBUG: TOKEN:', this.state.user_token);
        try {
            await fetch('http://10.0.2.2:3333/api/v0.0.5/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': this.state.user_token
                }
            });
            this.deleteValueLocally();
            this.props.navigation.goBack();
        }
        catch (error) {
            this.deleteValueLocally();
            this.setState({ loginMessage: `Failed to log out, ${error}` });
            console.log('>>> LOGOUT ERROR: ', error);
        }
        this.setState({ user_token: null });
        console.log('>>> LOGOUT ', `Logged out! Token: ${this.state.user_token}`);
    }

    componentDidMount() {
        this.getValueLocally();
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
                <TouchableOpacity onPress={this.setValueLocally} activeOpacity={0.7}>
                    <Text> Register </Text>
                </TouchableOpacity>
                <Button title='Login' style={{ margin: 8 }} onPress={() => { this.postUserLogin(this.state.email, this.state.password) }}></Button>
                <Text>{this.state.loginMessage}</Text>
            </View >
        );
    }
}

export default Login;
