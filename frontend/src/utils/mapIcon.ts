import Leaflet from 'leaflet'

import markerIcon from '../assets/Marker.png';

const mapIcon = Leaflet.icon({
  iconUrl: markerIcon,
  iconSize: [70,70],
  iconAnchor: [35, 70],
  popupAnchor: [170, 2]
})

export default mapIcon