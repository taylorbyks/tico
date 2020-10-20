import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';

import mapMarker from '../../images/Marker.png'

export default function SelectMapPosition() {
  const navigation = useNavigation();

  function handleNextStep() {
    navigation.navigate('PetData');
  }

  return (
    <View style={styles.container}>
      <MapView 
        initialRegion={{
          latitude: -24.95, 
          longitude: -53.4547,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }}
        style={styles.mapStyle}
      >
        <Marker 
          icon={mapMarker}
          coordinate={{ latitude: -24.95, longitude: -53.4547 }}
        />
      </MapView>

      <RectButton style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'SourceSerifPro_700Bold',
    fontSize: 16,
    color: '#FFF',
  }
})