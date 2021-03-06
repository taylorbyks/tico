import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import mapMarker from '../images/Marker.png'
import Logo from '../images/Logo.png'
import mapStyle from '../utils/mapStyle.json'
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Pet {
  id: number
  name: string
  longitude: number
  latitude: number
}

export default function List() {
  const [pets, setPets] = useState<Pet[]>([])
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      api.get('pets').then(response => {
        setPets(response.data)
      })
    }, [])
  )
  
  function handleNavigationtoPetDetails(id: number){
    navigation.navigate('PetDetails', { id })
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
  
        {pets.map(pet => {
          return (
            <Marker 
            key={pet.id}  
            icon={mapMarker}
            calloutAnchor={{
              x: 2.5,
              y: 0.9,
            }}
            coordinate={{
              latitude: pet.latitude, 
              longitude: pet.longitude,
            }}
            >
                <Callout tooltip onPress={() => handleNavigationtoPetDetails(pet.id)}>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>{pet.name}</Text>
                  </View>
                </Callout>
            </Marker>
          )
        })}
      </MapView>
        <Image style={styles.logo} source={Logo} />
      
      <View style={styles.footer}>
      <Text style={styles.footerText}>{pets.length} Animais encontrados</Text>

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

  logo: {
    width: 170,
    height: 50,
    position: "absolute",
    left: 25,
    right: 24,
    top: 60,
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
    backgroundColor: '#2c9fe7',
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
