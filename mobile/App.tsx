import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import { Rubik_400Regular, Rubik_500Medium, Rubik_700Bold } from '@expo-google-fonts/rubik'

import mapMarker from './src/images/Marker.png'

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
    <View style={styles.container}>
      <StatusBar style="dark" />
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{
          latitude: -24.95, 
          longitude: -53.4547,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
      }}>
      <Marker 
        icon={mapMarker}
        calloutAnchor={{
          x: 1,
          y: 0.8,
        }}
        coordinate={{
          latitude: -24.95, 
          longitude: -53.4547,
        }}
      >
          <Callout tooltip onPress={() => { alert('click')}}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Cachorro</Text>
            </View>
          </Callout>
      </Marker>
      </MapView>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>2 Animais encontrados</Text>

        <TouchableOpacity style={styles.createPetButton} onPress={() => {}}>
          <Feather name="plus" size={20} color="#fff"/>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: "#fff",
    borderRadius: 16,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
    //Shadow Ios
  },

  footerText: {
    fontFamily: 'Rubik_500Medium',
    color: '#633e3e',
  },

  createPetButton: {
    width: 56,
    height: 56,
    backgroundColor: '#633e3e',
    borderRadius: 16,

    justifyContent: 'center',
    alignItems: 'center',
    

  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },

  calloutText: {
    fontFamily: 'Rubik_500Medium',
    color: '#633e3e',
    fontSize: 14,
  },
});
