import React, { Component } from 'react';
import { Text, View, Alert, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/Styles';
import fonts from '../styles/Font.styles';

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
                    {/* Timestamp */}
                    <Text style={[spacing, fontSize.brevier, { backgroundColor: '#f0f0f0' }]}>
                        {Date(this.props.item.timesamp)}
                    </Text>
                </View>
            </View >);
    }
}

Chits.propTypes = { item: PropTypes.object.isRequired };