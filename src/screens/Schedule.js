import React, { useState, useEffect } from 'react'
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	FlatList,
	TouchableOpacity,
	Platform,
	AsyncStorage
} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import todayImage from '../../assets/imgs/today.jpg'
import global from '../../src/styles/global'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'
import NewTask from './NewTask'

const Schedule = () => {
	const [tasks, setTasks] = useState([])

	const [showDoneTasks, setShowDoneTasks] = useState(true)
	const [visibleTasks, setVisibleTasks] = useState([])
	const [showNewTask, setShowNewTask] = useState(false)

	const addTask = ({ description, date }) => {
		setTasks([
			...tasks,
			{
				id: Math.random(),
				description,
				estimateAt: date,
				doneAt: null
			}
		])

		setShowNewTask(false)
	}

	const deleteTask = id => {
		setTasks(tasks.filter(task => id !== task.id))
	}

	const filterTasks = () => {
		const visibleTasks = [...tasks]
		setVisibleTasks(
			visibleTasks.filter(task => {
				if (showDoneTasks) {
					return task
				} else {
					return task.doneAt === null
				}
			})
		)

		AsyncStorage.setItem('tasks', JSON.stringify(tasks))
	}

	const toggleFilter = () => {
		setShowDoneTasks(!showDoneTasks)
	}

	useEffect(() => {
		const getTasks = async () => {
			const data = await AsyncStorage.getItem('tasks')
			const tasks = JSON.parse(data) || []
			setTasks(tasks)
		}
		getTasks()
	}, [])

	useEffect(() => {
		filterTasks()
	}, [showDoneTasks, tasks])

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
			<NewTask
				isVisible={showNewTask}
				onSave={addTask}
				onCancel={() => setShowNewTask(false)}
			/>
			<ImageBackground source={todayImage} style={styled.background}>
				<View style={styled.iconBar}>
					<TouchableOpacity onPress={toggleFilter}>
						<Icon
							name={showDoneTasks ? 'eye' : 'eye-slash'}
							size={20}
							color={global.colors.secondary}
						/>
					</TouchableOpacity>
				</View>
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
					data={visibleTasks}
					keyExtractor={item => `${item.id}`}
					renderItem={({ item }) => (
						<Task {...item} toggleTask={toggleTask} onDelete={deleteTask} />
					)}
				/>
			</View>
			<ActionButton
				buttonColor={global.colors.today}
				onPress={() => setShowNewTask(true)}
			/>
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
	},
	iconBar: {
		marginTop: Platform.OS === 'ios' ? 30 : 10,
		marginHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'flex-end'
	}
})

export default Schedule
