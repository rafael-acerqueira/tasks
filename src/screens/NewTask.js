import React, { useState } from 'react'
import {
	Modal,
	View,
	Text,
	TextInput,
	DatePickerIOS,
	DatePickerAndroid,
	StyleSheet,
	TouchableWithoutFeedback,
	TouchableOpacity
} from 'react-native'
import moment from 'moment'
import global from '../styles/global'

const NewTask = props => {
	const [description, setDescription] = useState('')
	const [date, setDate] = useState(new Date())

	const save = () => {
		const data = { description, date }
		props.onSave(data)
		setDescription('')
		setDate(new Date())
	}

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
				<DatePickerIOS
					mode="date"
					date={date}
					onDateChange={date => setDate(date)}
				/>
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
