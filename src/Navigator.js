import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Schedule from '../src/screens/Schedule'
import Auth from '../src/screens/Auth'

const MainRoutes = createSwitchNavigator(
	{
		Auth: {
			name: 'Auth',
			screen: Auth
		},
		Home: {
			name: 'Home',
			screen: Schedule
		}
	},
	{ initialRouteName: 'Auth' }
)

export default createAppContainer(MainRoutes)
