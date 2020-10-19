import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useFonts } from 'expo-font'
import { SourceSerifPro_400Regular, SourceSerifPro_600SemiBold, SourceSerifPro_700Bold } from '@expo-google-fonts/source-serif-pro'

import Routes from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    SourceSerifPro_400Regular, 
    SourceSerifPro_600SemiBold, 
    SourceSerifPro_700Bold,
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
