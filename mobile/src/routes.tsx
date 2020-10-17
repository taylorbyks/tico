import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

import List from './pages/List'
import PetDetails from './pages/PetDetails'


export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="List" component={List}/>
        <Screen name="PetDetails" component={PetDetails}/>
      </Navigator>
    </NavigationContainer>
  )
}