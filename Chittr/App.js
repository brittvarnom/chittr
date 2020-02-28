import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Chit from './components/Chit';

class Chittr extends Component {

	constructor (props) {
		super(props);

		this.state = {
			chittrResponse: [],
			chit_id: '',
			timestamp: '',
			chit_content: '',
			user: [],
			location: ''
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

	getLatestChits() {
		return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					isLoading: false,
					responseJ: responseJson,
				});
				console.log('TEST', responseJson);
			})
			.catch((error) => {
				console.log(error);
			});
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
				<FlatList
					data={this.state.responseJ}
					renderItem={({ item }) =>
						<View>
							<Chit item={item} />
						</View>}
					keyExtractor={({ id }, index) => id} />
			</View >
		);
	}
}

export default Chittr