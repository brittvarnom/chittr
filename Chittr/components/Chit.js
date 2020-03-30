import React, { Component } from 'react'
import { Text, View, Alert, Image } from 'react-native'
import PropTypes from 'prop-types'
import styles from '../styles/Styles'
import fonts from '../styles/Font.styles'

const spacing = styles.gelSpacingUnit
const fontSize = {
  pica: fonts.pica,
  body: fonts.bodyCopy,
  brevier: fonts.brevier
}

export default class Chit extends Component {
  getLatitudeAndLongitude (location) {
    return `${location.latitude}, ${location.longitude}`
  }

  render () {
    const url = `http://localhost:3333/api/v0.0.5/user/${this.props.item.user.user_id}/photo`
    return (
      // Chit
      <View style={{ backgroundColor: 'white', marginBottom: 8 }}>
        {/* User's info */}
        <View
          style={
            (spacing, { flexDirection: 'row', backgroundColor: 'moccasin' })
          }
        >
          {/* Profile pic */}
          <Image style={{ height: 50, width: 50 }} source={url} />
          {/* Username */}
          <Text
            style={[fontSize.pica, spacing]}
            onPress={() => {
              Alert.alert('test')
            }}
          >
            {`${this.props.item.user.given_name} ${this.props.item.user.family_name}`}
          </Text>
        </View>
        {/* Chit */}
        <Text
          style={[fontSize.body, spacing]}
          onPress={() => {
            Alert.alert('test')
          }}
        >
          {this.props.item.chit_content}
        </Text>
        <View style={{ backgroundColor: '#f0f0f0' }}>
          {/* Timestamp */}
          <Text style={[spacing, fontSize.brevier]}>
            {Date(this.props.item.timesamp)}
          </Text>
          {/* Location (If the chit has one) */}
          {this.props.item.location && (
            <Text style={[spacing, fontSize.brevier]}>
              {this.getLatitudeAndLongitude(this.props.item.location)}
            </Text>
          )}
        </View>
      </View>
    )
  }
}

Chit.propTypes = {
  item: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired
}
