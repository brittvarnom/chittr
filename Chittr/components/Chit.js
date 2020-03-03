import React, { Component } from 'react';
import { Text, View, Alert, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/Styles';
import fonts from '../styles/Font.styles';
import * as usertz from 'user-timezone';

const spacing = styles.gelSpacingUnit;
const fontSize = { pica: fonts.pica, body: fonts.bodyCopy, brevier: fonts.brevier };

export default class Chits extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            //Chit
            <View>
                {/* User's info */}
                <View style={spacing, { flexDirection: 'row', backgroundColor: 'moccasin' }}>
                    {/* Profile pic */}
                    <Image
                        style={{ height: 50, width: 50 }}
                        source={require('../assets/chick_icon.png')}
                    />
                    {/* Username */}
                    <Text style={[fontSize.pica, spacing]} onPress={() => { Alert.alert("test"); }}>
                        {`${this.props.item.user.given_name} ${this.props.item.user.family_name}`}
                    </Text>
                </View>
                {/* Chit */}
                <Text style={[fontSize.body, spacing]} onPress={() => { Alert.alert("test"); }}>
                    {this.props.item.chit_content}
                </Text>
                <View>
                    {/* Timestamp (Existing chits seem to have weird timestamps, so year is strangely large)*/}
                    <Text style={[spacing, fontSize.brevier, { backgroundColor: '#f0f0f0' }]}>
                        {usertz.datetime(this.props.item.timestamp, 'Do MMM, YYYY h:mm ss A')}
                    </Text>
                </View>
            </View >);
    }
}

Chits.propTypes = { item: PropTypes.object.isRequired };