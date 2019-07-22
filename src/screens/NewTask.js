import React, { useState } from 'react'
import {
	Modal,
	View,
	Text,
	TextInput,
	DatePickerIOS,
	DatePickerAndroid,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Alert
} from 'react-native'
import moment from 'moment'
import global from '../styles/global'

const NewTask = props => {
	const [description, setDescription] = useState('')
	const [date, setDate] = useState(new Date())

	const save = () => {
		if (!description.trim()) {
			Alert.alert('Dados inválidos', 'Informe uma descrição')
			return
		}
		const data = { description, date }
		props.onSave(data)
		setDescription('')
		setDate(new Date())
	}

	const handleDateAndroidChange = () => {
		DatePickerAndroid.open({
			date
		}).then(event => {
			if (event.action !== DatePickerAndroid.dismissedAction) {
				const momentDate = moment(date)
				momentDate.date(event.day)
				momentDate.month(event.month)
				momentDate.year(event.year)
				setDate(momentDate.toDate())
			}
		})
	}

	let datePicker =
		Platform.OS === 'ios' ? (
			<DatePickerIOS
				mode="date"
				date={date}
				onDateChange={date => setDate(date)}
			/>
		) : (
			<TouchableOpacity onPress={handleDateAndroidChange}>
				<Text style={styled.date}>
					{moment(date).format('ddd, D [de] MMMM [de] YYYY')}
				</Text>
			</TouchableOpacity>
		)
	return (
		<Modal
			onRequestClose={props.onCancel}
			visible={props.isVisible}
			animationType="slide"
			transparent={true}
		>
			<TouchableWithoutFeedback onPress={props.onCancel}>
				<View style={styled.offset} />
			</TouchableWithoutFeedback>
			<View style={styled.container}>
				<Text style={styled.header}>Nova Tarefa!</Text>
				<TextInput
					placeholder="Descrição..."
					style={styled.input}
					onChangeText={text => setDescription(text)}
					value={description}
				/>
				{datePicker}
				<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
					<TouchableOpacity onPress={props.onCancel}>
						<Text style={styled.button}>Cancelar</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={save}>
						<Text style={styled.button}>Salvar</Text>
					</TouchableOpacity>
				</View>
			</View>
			<TouchableWithoutFeedback onPress={props.onCancel}>
				<View style={styled.offset} />
			</TouchableWithoutFeedback>
		</Modal>
	)
}

export default NewTask

const styled = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		justifyContent: 'space-between'
	},
	offset: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.7)'
	},
	button: {
		margin: 20,
		marginRight: 30,
		color: global.colors.default
	},
	header: {
		fontFamily: global.fontFamily,
		backgroundColor: global.colors.default,
		color: global.colors.secondary,
		textAlign: 'center',
		padding: 15,
		fontSize: 15
	},
	input: {
		fontFamily: global.fontFamily,
		width: '90%',
		height: 40,
		marginTop: 10,
		marginLeft: 10,
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#e3e3e3',
		borderRadius: 6
	},
	date: {
		fontFamily: global.fontFamily,
		fontSize: 20,
		marginLeft: 10,
		marginTop: 10,
		textAlign: 'center'
	}
})
