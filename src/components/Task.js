import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import global from '../styles/global'
import Swipeable from 'react-native-swipeable'

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

	const leftRemoveActionContent = (
		<View style={styled.exclude}>
			<Icon name="trash" size={20} color="#FFF" />
			<Text style={styled.excludeText}>Excluir</Text>
		</View>
	)

	const rightRemoveActionButtons = [
		<TouchableOpacity
			style={[
				styled.exclude,
				{ justifyContent: 'flex-start', paddingLeft: 20 }
			]}
			onPress={() => props.onDelete(props.id)}
		>
			<Icon name="trash" size={30} color="#FFF" />
		</TouchableOpacity>
	]

	return (
		<Swipeable
			leftActionActivationDistance={200}
			onLeftActionActivate={() => props.onDelete(props.id)}
			leftContent={leftRemoveActionContent}
			rightButtons={rightRemoveActionButtons}
		>
			<View style={styled.container}>
				<TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
					<View style={styled.checkContainer}>{check}</View>
				</TouchableWithoutFeedback>
				<View>
					<Text style={[styled.description, descStyle]}>
						{props.description}
					</Text>
					<Text style={styled.date}>
						{moment(props.estimateAt)
							.locale('pt-BR')
							.format('ddd, D [de] MMMM [de] YYYY')}
					</Text>
				</View>
			</View>
		</Swipeable>
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
	},
	exclude: {
		flex: 1,
		backgroundColor: 'red',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	excludeText: {
		fontFamily: global.fontFamily,
		color: '#FFF',
		fontSize: 20,
		margin: 10
	}
})
