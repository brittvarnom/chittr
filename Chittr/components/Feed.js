import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, Button, Alert, ScrollView, Text } from 'react-native';
import Chit from './Chit';

class Feed extends Component {
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
            user_id: ''
        };
    }

    getLatestChits() {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    responseJ: responseJson,
                });
            })
            .catch((error) => {
                console.log('>>> ERROR', error);
            });
    }

    getUser(user_id) {
        return fetch(`http://10.0.2.2:3333/api/v0.0.5/user/${user_id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    responseJ: responseJson,
                });
                console.log('>>> GET USER SUCCESS', responseJson);
                Alert.alert(responseJson)
            })
            .catch((error) => {
                console.log('>>> ERROR', error);
            });
    }

    postUserRegister() {
        const data = JSON.stringify({
            given_name: 'Britt',
            family_name: 'Test',
            email: 'britttest@test.com',
            password: 'password'
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
                console.error('>>> ERROR', error);
            })
    }

    postUserLogin() {
        const data = JSON.stringify({
            email: 'britttest@test.com',
            password: 'password'
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
            })
            .catch((error) => {
                console.error('>>>> ERROR', error);
            })
    }

    postChit(token) {
        const data = JSON.stringify({
            timestamp: Date.now(),
            chit_content: "test",
        });

        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: data
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error('>>> ERROR', error);
            })
    }

    componentDidMount() {
        this.getLatestChits();
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
                <Button
                    title='Registerr'
                    onPress={() => { this.postUserRegister() }}
                />
                <Button
                    title='Login'
                    onPress={() => { console.log('>>> TIME', Date.now()), this.postUserLogin() }}
                />
                <Button
                    title='Me'
                    onPress={() => { this.getUser(this.state.user_id) }}
                />
                <Button
                    title='Chit'
                    onPress={() => { console.log('>>> TOKEN', this.state.user_token); this.postChit(this.state.user_token) }}
                />
                {/* List rendering all chits */}
                <FlatList
                    data={this.state.responseJ}
                    // Map each item
                    renderItem={({ item }) =>
                        <View>
                            {/* Individual chit component */}
                            <Chit item={item} />
                        </View>}
                    keyExtractor={({ id }, index) => id} />
            </View >
        )
    }
}

export default Feed;