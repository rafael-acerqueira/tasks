import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { Gravatar } from 'react-native-gravatar'
import { DrawerItems } from 'react-navigation'
import global from '../styles/global'

export default props => {
	return (
		<ScrollView>
			<View style={styled.header}>
				<Text style={styled.title}>Tasks</Text>
				<Gravatar
					style={styled.avatar}
					options={{ email: props.navigation.getParam('email'), secure: true }}
				/>
				<View style={styled.userInfo}>
					<View>
						<Text style={styled.name}>{props.navigation.getParam('name')}</Text>
						<Text style={styled.email}>
							{props.navigation.getParam('email')}
						</Text>
					</View>
				</View>
			</View>
			<DrawerItems {...props} />
		</ScrollView>
	)
}

const styled = StyleSheet.create({
	header: {
		borderBottomWidth: 1,
		borderColor: '#DDD'
	},
	title: {
		backgroundColor: '#FFF',
		color: '#000',
		fontFamily: global.fontFamily,
		fontSize: 30,
		paddingTop: 30,
		padding: 10
	},
	avatar: {
		width: 60,
		height: 60,
		borderWidth: 3,
		borderColor: '#AAA',
		borderRadius: 30,
		margin: 10
	},
	name: {
		fontFamily: global.fontFamily,
		color: global.colors.mainText,
		fontSize: 20,
		marginLeft: 10
	},
	email: {
		fontFamily: global.fontFamily,
		color: global.colors.subText,
		fontSize: 15,
		marginLeft: 10,
		marginBottom: 10
	},
	menu: {
		justifyContent: 'center',
		alignItems: 'stretch'
	},
	userInfo: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
})
