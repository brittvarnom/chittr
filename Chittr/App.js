import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator, Button, Alert, TextInput } from 'react-native';

var signedIn = false;

function displayLogin() {
	return (
		<Text>Hi test</Text>
	);
}

class HelloWorldApp extends Component {

	constructor (props) {
		super(props);

		this.state = {

		};
	}

	// getData() {
	// 	return fetch('http://10.0.2.2:3333/list/')
	// 		.then((response) => response.json())
	// 		.then((responseJson) => {
	// 			this.setState({
	// 				isLoading: false,
	// 				shoppingListData: responseJson,
	// 			});
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// }

	componentDidMount() {
		// this.getData();
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
				<Text>Test!</Text>
				{displayLogin()}
			</View >
		);
	}
}

export default HelloWorldApp