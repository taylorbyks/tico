import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

import List from './pages/List'
import PetDetails from './pages/PetDetails'
import PetData from './pages/CreatePet/PetData'
import SelectMapPosition from './pages/CreatePet/SelectMapPosition'
import Header from './components/Header';

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5'} }}>
        <Screen name="List" component={List}/>
        <Screen name="PetDetails" component={PetDetails} options={{ headerShown: true, header: () => <Header title="Pet"/>}}/>
        <Screen name="SelectMapPosition" component={SelectMapPosition} options={{ headerShown: true, header: () => <Header title="Selecione no mapa"/>}}/>
        <Screen name="PetData" component={PetData} options={{ headerShown: true, header: () => <Header title="Informe os dados"/>}}/>
      </Navigator>
    </NavigationContainer>
  )
}