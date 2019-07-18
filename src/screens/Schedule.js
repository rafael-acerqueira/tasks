import React from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import todayImage from '../../assets/imgs/today.jpg'
import global from '../../src/styles/global'

const Schedule = () => (
	<View style={styled.container}>
		<ImageBackground source={todayImage} style={styled.background}>
			<View style={styled.titleBar}>
				<Text style={styled.title}>Hoje</Text>
				<Text style={styled.subtitle}>
					{moment()
						.locale('pt-BR')
						.format('ddd, D [de] MMMM')}
				</Text>
			</View>
		</ImageBackground>
		<View style={styled.taskContainer}>
			<Text>Tarefa 1</Text>
			<Text>Tarefa 2</Text>
			<Text>Tarefa 3</Text>
		</View>
	</View>
)

const styled = StyleSheet.create({
	container: {
		flex: 1
	},
	background: {
		flex: 3
	},
	titleBar: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	title: {
		fontFamily: global.fontFamily,
		color: global.colors.secondary,
		fontSize: 50,
		marginLeft: 20,
		marginBottom: 10
	},
	subtitle: {
		fontFamily: global.fontFamily,
		color: global.colors.secondary,
		fontSize: 20,
		marginLeft: 20,
		marginBottom: 30
	},
	taskContainer: {
		flex: 7
	}
})

export default Schedule
