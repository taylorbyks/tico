import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import mapMarker from '../../images/Marker.png'
import mapStyle from '../../utils/mapStyle.json'
import api from "../../services/api"

export default function SelectMapPosition() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0})
  
  const navigation = useNavigation();

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate)
  }

  function handleNextStep() {
    navigation.navigate('PetData', { position });
  }

  return (
    <View style={styles.container}>
      <MapView 
        onPress={handleSelectMapPosition}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: -24.95, 
          longitude: -53.4547,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }}
        style={styles.mapStyle}
      >
         {position.latitude !== 0 && (
          <Marker icon={mapMarker} coordinate={{ latitude: position.latitude, longitude: position.longitude }} />
        )}
      </MapView>

      {position.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
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
    backgroundColor: '#2c9fe7',
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