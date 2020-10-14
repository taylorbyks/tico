import React from 'react';
import '../styles/global.css'
import '../styles/pages/list.css'
import 'leaflet/dist/leaflet.css';
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Map, TileLayer } from 'react-leaflet'
import logo from '../assets/Logo.png'

function List() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={logo}></img>
          <h2>Escolha um no mapa</h2>
          <p>Muitos animais estao a procura de um lar</p>
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
      </Map>

        <Link to="" className="create">
          <FiPlus size={32} color="#fff" />
        </Link>
    </div>
  );
}

export default List
