import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Button, Text, AsyncStorage } from 'react-native';
import Feed from './components/Feed';
import Chit from './components/Chit';
import Login from './components/Login';
import Register from './components/Register';
import Compose from './components/Compose';

function DetailsScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Details Screen</Text>
			<Button
				title="Go to Details... again"
				onPress={() => navigation.push('Home')}
			/>
			<Button
				title="Go back"
				onPress={() => navigation.goBack()}
			/>
		</View>
	);
}

function StackNav({ navigation }) {
	return (
		<Stack.Navigator initialRouteName="Feed">
			<Stack.Screen name="Feed" component={Feed} options={{ title: 'Latest Chits' }} />
			<Stack.Screen name="Register" component={Register} options={{ title: 'Create New Account' }} />
			<Stack.Screen name="Login" component={Login} options={{ title: 'Sign In' }} />
		</Stack.Navigator>
	);
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const item = {
	"chit_id": 1,
	"timestamp": 1571491140000,
	"chit_content": "Having lunch with Turing!",
	"user": {
		"user_id": 1,
		"given_name": "Emmachanged",
		"family_name": "Smith Changed",
		"email": "emma.smith@example.com"
	},
	"location": {
		"longitude": -2.240027,
		"latitude": 53.476445
	}
}

class Chittr extends Component {
	constructor (props) {
		super(props);

		this.state = {
			user_token: ''
		};
	}

	SignInRegister({ navigation, }) {
		return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Details Screen</Text>
			<Button
				title="Sign In"
				onPress={() => navigation.navigate('Login')}
			/>
			<Button
				title="Register"
				onPress={() => navigation.navigate('Register')}
			/>
		</View>
	}

	getValueLocally = () => {
		AsyncStorage.getItem('@LOGIN_TOKEN').then((value) => this.setState({ user_token: value }));
		console.log('TOKEN RETRIEVED: ', this.state.user_token);
	}

	componentDidMount() {
		this.getValueLocally();
	}

	render() {
		return (
			<NavigationContainer>
				<Drawer.Navigator initialRouteName="Feed">
					<Drawer.Screen name="Feed" component={StackNav} options={{ title: 'Latest Chits' }} />
					<Drawer.Screen name="Login/Register" component={this.SignInRegister} />
					<Drawer.Screen name="Register" component={Register} />
					<Drawer.Screen name="New Chit" component={Compose} />
					<Drawer.Screen name="Chit Test">
						{props => <Chit {...props} item={item} />}
					</Drawer.Screen>
					<Drawer.Screen name="Details test" component={DetailsScreen} />
				</Drawer.Navigator>
			</NavigationContainer>
		);
	}
}

export default Chittr;
