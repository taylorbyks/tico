import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useFonts } from 'expo-font'
import { Rubik_400Regular, Rubik_500Medium, Rubik_700Bold } from '@expo-google-fonts/rubik'

import Routes from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium, 
    Rubik_700Bold,
  })
  
  if(!fontsLoaded) {
    return null
  }

  return (
    <>
      <StatusBar style="dark" />
      <Routes />
    </>
  )
}
