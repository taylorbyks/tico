import React from 'react';
import { Image, View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

import mapMarker from '../images/Marker.png'
import { RectButton } from 'react-native-gesture-handler';
import mapStyle from '../utils/mapStyle.json'

export default function PetDetails() {
  const route = useRoute()
  
  return (
      <ScrollView style={styles.container}>
        <View style={styles.imagesContainer}>
          <ScrollView horizontal pagingEnabled>
            <Image style={styles.image} source={{ uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg' }} />
            <Image style={styles.image} source={{ uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg' }} />
            <Image style={styles.image} source={{ uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg' }} />
          </ScrollView>
        </View>
  
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>PetName</Text>
          <Text style={styles.description}>PetAbout</Text>
        
          <View style={styles.mapContainer}>
            <MapView 
              provider={PROVIDER_GOOGLE}
              customMapStyle={mapStyle}
              initialRegion={{
                latitude: -24.95, 
                longitude: -53.4547,
                latitudeDelta: 0.09,
                longitudeDelta: 0.09,
              }}
              zoomEnabled={false}
              pitchEnabled={false}
              scrollEnabled={false}
              rotateEnabled={false}
              style={styles.mapStyle}
            >
              <Marker 
                icon={mapMarker}
                coordinate={{ 
                  latitude: -27.2092052,
                  longitude: -49.6401092
                }}
              />
            </MapView>
  
            <View style={styles.routesContainer}>
              <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
            </View>
          </View>
        
          <View style={styles.separator} />
  
          <Text style={styles.title}>Contato</Text>
          <Text style={styles.description}>userName</Text>
  
          <View style={styles.scheduleContainer}>
            <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
              <Feather name="thumbs-up" size={40} color="#15B6D6" />
              <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>PetPuppy</Text>
            </View>
            <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
              <Feather name="minimize-2" size={40} color="#15B6D6" />
              <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>petBig</Text>
            </View>
          </View>
  
          <RectButton style={styles.contactButton} onPress={() => {}}>
            <FontAwesome name="whatsapp" size={24} color="#FFF" />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </ScrollView>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    imagesContainer: {
      height: 240,
    },
  
    image: {
      width: Dimensions.get('window').width,
      height: 240,
      resizeMode: 'cover',
    },
  
    detailsContainer: {
      padding: 24,
    },
  
    title: {
      color: '#633e3e',
      fontSize: 30,
      fontFamily: 'SourceSerifPro_700Bold',
    },
  
    description: {
      fontFamily: 'SourceSerifPro_600SemiBold',
      color: '#633e3e',
      lineHeight: 24,
      marginTop: 16,
    },
  
    mapContainer: {
      borderRadius: 20,
      overflow: 'hidden',
      borderWidth: 1.2,
      borderColor: '#B3DAE2',
      marginTop: 40,
      backgroundColor: '#E6F7FB',
    },
  
    mapStyle: {
      width: '100%',
      height: 150,
    },
  
    routesContainer: {
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    routesText: {
      fontFamily: 'SourceSerifPro_700Bold',
      color: '#0089a5'
    },
  
    separator: {
      height: 0.8,
      width: '100%',
      backgroundColor: '#D3E2E6',
      marginVertical: 40,
    },
  
    scheduleContainer: {
      marginTop: 24,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
  
    scheduleItem: {
      width: '48%',
      padding: 20,
    },
  
    scheduleItemBlue: {
      backgroundColor: '#E6F7FB',
      borderWidth: 1,
      borderColor: '#B3DAE2',
      borderRadius: 20,
    },
  
    scheduleItemGreen: {
      backgroundColor: '#EDFFF6',
      borderWidth: 1,
      borderColor: '#A1E9C5',
      borderRadius: 20,
    },
  
    scheduleText: {
      fontFamily: 'SourceSerifPro_600SemiBold',
      fontSize: 16,
      lineHeight: 24,
      marginTop: 20,
    },
  
    scheduleTextBlue: {
      color: '#5C8599'
    },
  
    scheduleTextGreen: {
      color: '#37C77F'
    },
  
    contactButton: {
      backgroundColor: '#3CDC8C',
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 56,
      marginTop: 40,
    },
  
    contactButtonText: {
      fontFamily: 'SourceSerifPro_700Bold',
      color: '#FFF',
      fontSize: 16,
      marginLeft: 16,
    }
  })