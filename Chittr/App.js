import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';

class Chittr extends Component {

	constructor (props) {
		super(props);

		this.state = {
			chittrResponse: ['hi']
		};
	}

	//uncomment later, started putting in takePicture as reference
	// takePicture = async () => {
	// 	if (this.camera) {
	// 		const options = { quality: 0.5, base64: true };
	// 		const data = await this.camera.takePictureAsync(options);

	// 		console.log(data.uri, this.state.token);

	// 		return fetch("http://10.0.2.2.:3333/api/v0.0.5/user/photo", {
	// 			method: 'POST',
	// 			headers: []
	// 		})
	// 	}
	// }

	getData() {
		return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					isLoading: false,
				});
				console.log('TEST', responseJson);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	componentDidMount() {
		this.getData();
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
				{/* logging out response in the render for testing purposes */}
				<Text>{this.state.chittrResponse}</Text>
			</View >
		);
	}
}

export default Chittr