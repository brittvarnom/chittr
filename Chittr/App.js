import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator, Button, Alert, TextInput } from 'react-native';

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
				{/* {this.putItem()}
				{this.addSeperator()}
				{this.viewItems()}
				{this.addSeperator()} */}
				<Text>Test!</Text>
			</View >
		);
	}
}

export default HelloWorldApp