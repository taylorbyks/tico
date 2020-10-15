import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiClock, FiInfo } from 'react-icons/fi'
import { Map, Marker, TileLayer } from 'react-leaflet'
import Sidebar from '../components/Sidebar'

import '../styles/pages/pet.css'

import mapIcon from '../utils/mapIcon'

export default function Pet() {
  return (
    <div id="page-pet">
      <Sidebar />
      <main>
        <div className="pet-details">
          <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />

          <div className="images">
            <button className="active" type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
            <button type="button">
              <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
            </button>
          </div>
          
          <div className="pet-details-content">
            <h1>Cachorro</h1>
            <p>Info</p>

            <div className="map-container">
              <Map 
                center={[-27.2092052,-49.6401092]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
                />
                <Marker interactive={false} icon={mapIcon} position={[-27.2092052,-49.6401092]} />
              </Map>

              <footer>
                <a href="">Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Sobre</h2>
            <p>Venha como se sentir mais à vontade e traga muito amor para dar.</p>

            <div className="boolean">
              <div className="puppy">
                <FiClock size={32} color="#15B6D6" />
                É Filhote? <br />
                8h às 18h
              </div>
              <div className="big">
                <FiInfo size={32} color="#39CC83" />
                Achamos que ficara grande! <br />
                fim de semana
              </div>
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}