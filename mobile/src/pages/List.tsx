import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

import mapMarker from '../images/Marker.png'
import mapStyle from '../utils/mapStyle.json'
import { RectButton } from 'react-native-gesture-handler';

export default function List() {
  const navigation = useNavigation()
  
  function handleNavigationtoPetDetails(){
    navigation.navigate('PetDetails')
  }

  function handleNavigationtoCreatePet(){
    navigation.navigate('SelectMapPosition')
  }

  return (
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: -24.95, 
          longitude: -53.4547,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
      }}>
      <Marker 
        icon={mapMarker}
        calloutAnchor={{
          x: 2.5,
          y: 0.9,
        }}
        coordinate={{
          latitude: -24.95, 
          longitude: -53.4547,
        }}
      >
          <Callout tooltip onPress={handleNavigationtoPetDetails}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Cachorro</Text>
            </View>
          </Callout>
      </Marker>
      </MapView>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>2 Animais encontrados</Text>

        <RectButton style={styles.createPetButton} onPress={handleNavigationtoCreatePet}>
          <Feather name="plus" size={20} color="#fff"/>
        </RectButton>
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
    fontFamily: 'SourceSerifPro_600SemiBold',
    color: '#633e3e',
    fontSize: 16,
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
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
  },

  calloutText: {
    fontFamily: 'SourceSerifPro_400Regular',
    color: '#633e3e',
    fontSize: 14,
  },
});
