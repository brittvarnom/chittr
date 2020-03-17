import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator, FlatList, Button, Alert, ScrollView, Text } from 'react-native';
import Feed from './components/Feed';
import Chit from './components/Chit';
import Login from './components/Login';

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

const Stack = createStackNavigator();

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
	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Login">
					<Stack.Screen name="Feed" component={Feed} options={{ title: 'Latest Chits' }} />
					<Stack.Screen name="Home" component={DetailsScreen} />
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Chit">
						{props => <Chit {...props} item={item} />}
					</Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

export default Chittr;
