import React from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Logo from '../assets/Logo.png'
import mapIcon from '../utils/mapIcon'

import '../styles/pages/list.css'

function List() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={Logo}></img>
          <h2>Escolha um no mapa</h2>
          <p>Muitos animais estão a procura de um lar</p>
        </header>

        <footer>
          <strong>Cascavel</strong>
          <span>Paraná</span>
        </footer>
      </aside>

        <Map 
          center={[-24.9565605,-53.4840018]}
          zoom={13}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
        />

        <Marker
          icon={mapIcon}
          position={[-24.9565605,-53.4840018]}
        >
          <Popup 
            closeButton={false}
            minWidth={240}
            maxWidth={240}
            className="map-popup"
          > 
            Cachorro
            <Link to="/pets/1">
              <FiArrowRight size={20} color="#fff" />
            </Link>
          </Popup>
        </Marker>
        
      </Map>

        <Link to="/pets/create" className="create">
          <FiPlus size={32} color="#fff" />
        </Link>
    </div>
  );
}

export default List
