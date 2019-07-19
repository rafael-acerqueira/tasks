import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import global from '../styles/global'

export default props => {
	let check = null

	if (props.doneAt !== null) {
		check = (
			<View style={styled.done}>
				<Icon name="check" size={20} corlor={global.colors.secondary} />
			</View>
		)
	} else {
		check = <View style={styled.pending} />
	}

	const descStyle =
		props.doneAt !== null ? { textDecorationLine: 'line-through' } : {}

	return (
		<View style={styled.container}>
			<TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
				<View style={styled.checkContainer}>{check}</View>
			</TouchableWithoutFeedback>
			<View>
				<Text style={[styled.description, descStyle]}>{props.description}</Text>
				<Text style={styled.date}>
					{moment(props.estimateAt)
						.locale('pt-BR')
						.format('ddd, D [de] MMMM')}
				</Text>
			</View>
		</View>
	)
}

const styled = StyleSheet.create({
	container: {
		paddingVertical: 10,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: '#AAA'
	},
	checkContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '20%'
	},
	pending: {
		borderWidth: 1,
		height: 25,
		width: 25,
		borderRadius: 15,
		borderColor: '#555'
	},
	done: {
		height: 25,
		width: 25,
		borderRadius: 15,
		backgroundColor: '#4D7031',
		alignItems: 'center',
		justifyContent: 'center'
	},
	description: {
		fontFamily: global.fontFamily,
		color: global.colors.mainText,
		fontSize: 15
	},
	date: {
		fontFamily: global.fontFamily,
		color: global.colors.subText,
		fontSize: 12
	}
})
