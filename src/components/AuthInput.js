import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const AuthInput = props => (
	<View style={[styled.container, props.style]}>
		<Icon name={props.icon} size={20} style={styled.icon} />
		<TextInput {...props} style={styled.input} />
	</View>
)

export default AuthInput

const styled = StyleSheet.create({
	container: {
		width: '100%',
		height: 40,
		backgroundColor: '#EEE',
		borderRadius: 20,
		flexDirection: 'row',
		alignItems: 'center'
	},
	icon: {
		color: '#333',
		marginLeft: 20
	},
	input: {
		marginLeft: 20,
		width: '70%'
	}
})
