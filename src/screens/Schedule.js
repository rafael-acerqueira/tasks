import React, { useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import todayImage from '../../assets/imgs/today.jpg'
import global from '../../src/styles/global'
import Task from '../components/Task'

const Schedule = () => {
	const [tasks, setTasks] = useState([
		{
			id: Math.random(),
			description: 'Comprar Curso',
			estimateAt: new Date(),
			doneAt: new Date()
		},
		{
			id: Math.random(),
			description: 'Ver palestra sobre JS',
			estimateAt: new Date(),
			doneAt: null
		},
		{
			id: Math.random(),
			description: 'Comprar Curso',
			estimateAt: new Date(),
			doneAt: new Date()
		},
		{
			id: Math.random(),
			description: 'Comprar Curso',
			estimateAt: new Date(),
			doneAt: new Date()
		},
		{
			id: Math.random(),
			description: 'Comprar Curso',
			estimateAt: new Date(),
			doneAt: new Date()
		},
		{
			id: Math.random(),
			description: 'Comprar Curso',
			estimateAt: new Date(),
			doneAt: new Date()
		},
		{
			id: Math.random(),
			description: 'Comprar Curso',
			estimateAt: new Date(),
			doneAt: new Date()
		},
		{
			id: Math.random(),
			description: 'Comprar Curso',
			estimateAt: new Date(),
			doneAt: new Date()
		},
		{
			id: Math.random(),
			description: 'Comprar Curso',
			estimateAt: new Date(),
			doneAt: new Date()
		},
		{
			id: Math.random(),
			description: 'Comprar Curso',
			estimateAt: new Date(),
			doneAt: new Date()
		},
		{
			id: Math.random(),
			description: 'Comprar Curso',
			estimateAt: new Date(),
			doneAt: new Date()
		},
		{
			id: Math.random(),
			description: 'Comprar Curso',
			estimateAt: new Date(),
			doneAt: new Date()
		},
		{
			id: Math.random(),
			description: 'Comprar Curso',
			estimateAt: new Date(),
			doneAt: new Date()
		},
		{
			id: Math.random(),
			description: 'Comprar Curso',
			estimateAt: new Date(),
			doneAt: new Date()
		}
	])

	const toggleTask = id => {
		setTasks(
			tasks.map(task => {
				if (task.id === id) {
					return { ...task, doneAt: task.doneAt ? null : new Date() }
				}
				return task
			})
		)
	}

	return (
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
				<FlatList
					data={tasks}
					keyExtractor={item => `${item.id}`}
					renderItem={({ item }) => <Task {...item} toggleTask={toggleTask} />}
				/>
			</View>
		</View>
	)
}

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
