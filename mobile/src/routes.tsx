import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

import List from './pages/List'
import PetDetails from './pages/PetDetails'
import PetData from './pages/CreatePet/PetData'
import SelectMapPosition from './pages/CreatePet/SelectMapPosition'

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="List" component={List}/>
        <Screen name="PetDetails" component={PetDetails}/>
        <Screen name="SelectMapPosition" component={SelectMapPosition}/>
        <Screen name="PetData" component={PetData}/>
      </Navigator>
    </NavigationContainer>
  )
}