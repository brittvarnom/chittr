import React, { Component } from 'react';
import { View, ActivityIndicator, TextInput, Button, Alert, ScrollView, Text, AsyncStorage } from 'react-native';
import Chit from './Chit';

class Compose extends Component {
    constructor (props) {
        super(props);

        this.state = {
            chittrResponse: [],
            chit_id: '',
            timestamp: '',
            chit_content: '',
            user: [],
            location: '',
            user_token: '',
            user_id: '',
            content: ''
        };
    }

    postChit(timestamp, content) {
        const data = JSON.stringify({
            timestamp: timestamp,
            chit_content: content,
        });

        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.state.user_token
            },
            body: data
        })
            .then((response) => {
                response.json()
                this.props.navigation.goBack();
            })
            .catch((error) => {
                console.log('>>> ERROR', error);
                Alert.alert("Couldn't post chit, please try again");

            })
    }

    getValueLocally = () => {
        AsyncStorage.getItem('@LOGIN_TOKEN').then((value) => this.setState({ user_token: value }));
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

        return (
            <View>
                <TextInput
                    autoFocus={true}
                    maxLength={141}
                    multiline={true}
                    onChangeText={(content) => { this.setState({ content }) }}
                    placeholder='Enter Text'
                    style={{ width: 300 }}>
                </TextInput>
                <Button
                    title='Chit'
                    onPress={() => { console.log('>>> TOKEN', this.state.user_token); this.postChit(Date.now(), this.state.content) }}
                />
                <Text>{this.state.loginMessage}</Text>
            </View>

        )
    }
}

export default Compose;
