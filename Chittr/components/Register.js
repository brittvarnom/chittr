import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Button, AsyncStorage, Alert, TextInput, CheckBox, TouchableOpacity } from 'react-native';
import styles from '../styles/Styles';
const spacing = styles.gelSpacingUnit;

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
                this.props.navigation.goBack();
            })
            .catch((error) => {
                this.setState({ loginMessage: 'Failed to register, fill all fields' });
                console.log('>>> REGISTER FAILED: ', error);
            })
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
            return <View styles={spacing, { backgroundColor: 'moccasin' }}>
                <Text>Log out of your account:</Text>
                <Button title='Log out' onPress={() => { this.postUserLogout(this.state.user_token) }} />
            </View>
        }

        return (
            <View style={spacing, { alignItems: 'center' }}>
                <TextInput
                    autoCompleteType='name'
                    onChangeText={(gName) => { this.setState({ gName }) }}
                    placeholder='Given Name'
                    style={spacing, { width: 300, backgroundColor: 'moccasin' }} />
                <TextInput
                    onChangeText={(fName) => { this.setState({ fName }) }}
                    placeholder='Family Name'
                    style={spacing, { width: 300, backgroundColor: 'moccasin' }} />
                <TextInput
                    autoCompleteType='email'
                    onChangeText={(email) => { this.setState({ email }) }}
                    keyboardType='email-address'
                    placeholder='Email Address'
                    style={spacing, { width: 300, backgroundColor: 'moccasin' }} />
                <TextInput
                    autoCompleteType='password'
                    onChangeText={(password) => { this.setState({ password }) }}
                    placeholder='Password'
                    style={{ width: 300 }}
                    secureTextEntry={true}
                    style={spacing, { width: 300, backgroundColor: 'moccasin' }} />
                <Button title='Register' color='chocolate' style={{ margin: 8 }} onPress={() => { this.postUserRegister(this.state.gName, this.state.fName, this.state.email, this.state.password) }}></Button>
                <Text>{this.state.loginMessage}</Text>
            </View >
        );
    }
}

export default Login;
