import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Logo from '../assets/Logo.png'
import mapIcon from '../utils/mapIcon'
import api from '../services/api';

import '../styles/pages/list.css'

interface Pet {
  id: number
  latitude: number
  longitude: number
  name: string
}

function List() {
  const [pets, setPets] = useState<Pet[]>([])
  
  useEffect(() => {
    api.get('pets').then( response => {
      setPets(response.data)
    })
  }, [ ])

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

        {pets.map(pet => {
          return (
            <Marker
              key={pet.id}
              icon={mapIcon}
              position={[pet.latitude,pet.longitude]}
            >
          <Popup 
            closeButton={false}
            minWidth={240}
            maxWidth={240}
            className="map-popup"
          > 
            {pet.name}
            <Link to={`/pets/${pet.id}`}>
              <FiArrowRight size={20} color="#fff" />
            </Link>
          </Popup>
        </Marker>
          )
        })}
        
      </Map>

        <Link to="/pets/create" className="create">
          <FiPlus size={32} color="#fff" />
        </Link>
    </div>
  );
}

export default List
