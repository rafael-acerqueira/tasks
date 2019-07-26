import React, { useState, useEffect } from 'react'
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	FlatList,
	TouchableOpacity,
	Platform
} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import api, { showError } from '../services/api'
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

	const addTask = async ({ description, date }) => {
		try {
			await api.post('/tasks', {
				description,
				estimateAt: date
			})
			setShowNewTask(false)
			await loadTasks()
		} catch (error) {
			showError(error)
		}
	}

	const deleteTask = async id => {
		try {
			await api.delete(`/tasks/${id}`)
			await loadTasks()
		} catch (error) {
			showError(error)
		}
	}

	const loadTasks = async () => {
		try {
			const maxDate = moment().format('YYYY-MM-DD 23:59')
			const { data } = await api.get(`tasks?date=${maxDate}`)
			setTasks(data)
		} catch (error) {
			showError(error)
		}
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
	}

	const toggleFilter = () => {
		setShowDoneTasks(!showDoneTasks)
	}

	useEffect(async () => {
		await loadTasks()
	}, [])

	useEffect(() => {
		filterTasks()
	}, [showDoneTasks, tasks])

	const toggleTask = async id => {
		try {
			await api.put(`tasks/${id}/toggle-done-at`)
			await loadTasks()
		} catch (error) {
			showError(error)
		}
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
