import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
	render() {
		return (
			<NavigationContainer>
				<Drawer.Navigator initialRouteName="Feed">
					<Drawer.Screen name="Home" component={Feed} options={{ title: 'Latest Chits' }} />
					<Drawer.Screen name="Login" component={Login} />
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
