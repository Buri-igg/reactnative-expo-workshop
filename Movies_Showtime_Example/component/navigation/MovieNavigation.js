import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MoviesList from '../screens/MoviesList';
import MovieDetail from '../screens/MovieDetail';

const Stack = createStackNavigator();

const Navigation = () => (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
					headerStyle: {
							backgroundColor: '#000',
							borderBottomWidth: 0,
							shadowOpacity: 0
					},
					headerTintColor: '#ffffff',
        }}>
        <Stack.Screen 
					name="MoviesList"
					options={{
						title: 'Movies Showtime Example',
					}}
					component={MoviesList} 
        />
				<Stack.Screen 
					name="MovieDetail" 
					component={MovieDetail}
					options={{
						title: '',
						headerBackTitle: "ย้อนกลับ"
					}}
				/>
      </Stack.Navigator>
    </NavigationContainer>
  )
  
  export default Navigation
