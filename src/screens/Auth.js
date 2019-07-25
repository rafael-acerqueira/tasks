import React, { useState } from 'react'
import {
	Text,
	View,
	TextInput,
	ImageBackground,
	TouchableOpacity,
	Alert,
	StyleSheet
} from 'react-native'

import global from '../styles/global'
import loginBackgound from '../../assets/imgs/login.jpg'

const Auth = () => {
	const [stageNew, setStageNew] = useState(false)
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const signinOrSignup = () => {
		stageNew
			? Alert.alert('bbbbb', 'Cadastrar usuário')
			: Alert.alert('aaaaaaaa', 'Logar')
	}

	return (
		<ImageBackground source={loginBackgound} style={styled.background}>
			<Text style={styled.title}>Tarefas</Text>
			<View style={styled.formContainer}>
				<Text style={styled.subtitle}>
					{stageNew ? 'Crie sua conta' : 'Informe seus dados'}
				</Text>
				{stageNew && (
					<TextInput
						placeholder="Nome"
						style={styled.input}
						value={name}
						onChangeText={name => setName(name)}
					/>
				)}
				<TextInput
					placeholder="E-mail"
					style={styled.input}
					value={email}
					onChangeText={email => setEmail(email)}
				/>
				<TextInput
					placeholder="Senha"
					style={styled.input}
					value={password}
					onChangeText={password => setPassword(password)}
				/>

				{stageNew && (
					<TextInput
						placeholder="Confirmar Senha"
						style={styled.input}
						value={confirmPassword}
						onChangeText={confirmPassword =>
							setConfirmPassword(confirmPassword)
						}
					/>
				)}

				<TouchableOpacity onPress={signinOrSignup}>
					<View style={styled.button}>
						<Text style={styled.buttonText}>
							{stageNew ? 'Registrar' : 'Entrar'}
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setStageNew(!stageNew)}
					styled={{ padding: 10 }}
				>
					<Text style={styled.buttonText}>
						{stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
					</Text>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	)
}

export default Auth

const styled = StyleSheet.create({
	background: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		fontFamily: global.fontFamily,
		color: '#FFF',
		fontSize: 70,
		marginBottom: 10
	},
	subtitle: {
		fontFamily: global.fontFamily,
		color: '#FFF',
		fontSize: 20,
		textAlign: 'center'
	},
	formContainer: {
		backgroundColor: 'rgba(0,0,0,0.8)',
		padding: 20,
		width: '90%'
	},
	input: {
		marginTop: 10,
		backgroundColor: '#FFF'
	},
	button: {
		backgroundColor: '#080',
		marginTop: 10,
		marginBottom: 15,
		padding: 10,
		alignItems: 'center'
	},
	buttonText: {
		fontFamily: global.fontFamily,
		color: '#FFF',
		fontSize: 16,
		textAlign: 'center'
	}
})
