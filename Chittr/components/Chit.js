import React, { Component } from 'react';
import { Text, View, Alert, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/Styles';

const spacing = styles.gelSpacingUnit;

export default class Chits extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <View>
                <View style={spacing, { flexDirection: 'row', backgroundColor: 'pink' }}>
                    <Image
                        style={{ height: 50, width: 50 }}
                        source={require('../assets/sample_icon.png')}
                    />
                    <Text style={spacing} onPress={() => { Alert.alert("test"); }}>
                        {`${this.props.item.user.given_name} ${this.props.item.user.family_name}`}
                    </Text>
                </View>
                <Text style={spacing} onPress={() => { Alert.alert("test"); }}>
                    {this.props.item.chit_content}
                </Text>
                <View style={{ height: 2, backgroundColor: 'blue' }, spacing} />
            </View>);
    }
}

Chits.propTypes = { item: PropTypes.object.isRequired };