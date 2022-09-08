import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignUp from '../screens/SignUp'
import Login from '../screens/Login'
import ActivitiesScreen from '../screens/ActivitiesToDo'
import Home from '../screens/Home'

const Stack = createStackNavigator()

export const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName='Login'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='ActivitiesToDo' component={ActivitiesScreen} />
    </Stack.Navigator>
  )
}