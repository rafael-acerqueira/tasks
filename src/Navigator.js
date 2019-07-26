import React from 'react'
import {
	createSwitchNavigator,
	createDrawerNavigator,
	createAppContainer
} from 'react-navigation'
import Schedule from '../src/screens/Schedule'
import Auth from '../src/screens/Auth'
import global from './styles/global'

const MenuRoutes = createDrawerNavigator(
	{
		Today: {
			name: 'Today',
			screen: props => <Schedule title="Hoje" daysAhead={0} {...props} />,
			navigationOptions: {
				title: 'Hoje'
			}
		},
		Tomorrow: {
			name: 'Tomorrow',
			screen: props => <Schedule title="Amanhã" daysAhead={1} {...props} />,
			navigationOptions: {
				title: 'Amanhã'
			}
		},
		Week: {
			name: 'Week',
			screen: props => <Schedule title="Semana" daysAhead={7} {...props} />,
			navigationOptions: {
				title: 'Semana'
			}
		},
		Month: {
			name: 'Month',
			screen: props => <Schedule title="Mês" daysAhead={30} {...props} />,
			navigationOptions: {
				title: 'Mês'
			}
		}
	},
	{
		initialRouteName: 'Today',
		contentOptions: {
			labelStyle: {
				fontFamily: global.fontFamily,
				fontWeight: 'normal',
				fontSize: 20
			},
			activeLabelStyle: {
				color: '#080'
			}
		}
	}
)

const MainRoutes = createSwitchNavigator(
	{
		Auth: {
			name: 'Auth',
			screen: Auth
		},
		Home: {
			name: 'Home',
			screen: MenuRoutes
		}
	},
	{ initialRouteName: 'Auth' }
)

export default createAppContainer(MainRoutes)
