import React, { useEffect, useState } from 'react'
import { FaExpandAlt, FaWhatsapp } from 'react-icons/fa'
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import mapIcon from '../utils/mapIcon'
import api from '../services/api'

import '../styles/pages/pet.css'

interface Pet {
  id: number
  latitude: number
  longitude: number
  name: string
  about: string
  userName: string
  userNumber: string
  big: boolean
  puppy: boolean
  images: Array<{
    id: number
    url: string
  }>
}

interface PetParams {
  id: string
}

export default function Pet() {
  const params = useParams<PetParams>()
  const [pet, setPet] = useState<Pet>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {   
    api.get(`pets/${params.id}`).then( response => {
      setPet(response.data)
    })
  }, [params.id])

  if (!pet) {
    return <p>Carregando...</p>
  }
  
  return (
    <div id="page-pet">
      <Sidebar />
      <main>
        <div className="pet-details">
          <img src={pet.images[activeImageIndex].url} alt={pet.name} />

          <div className="images">
            {pet.images.map((image, index) => {
              return (
                <button 
                  key={image.id} 
                  className={activeImageIndex === index ? "active" : "" }
                  type="button" 
                  onClick={() => {
                    setActiveImageIndex(index)
                }}>
                  <img src={image.url} alt={pet.name} />
                </button>
              )
            })}
          </div>
          
          <div className="pet-details-content">
            <h1>{pet.name}</h1>
            <p>{pet.about}</p>

            <hr />

            <div className="boolean">
            {pet.puppy ? (
              <div className="puppy">
                <FiThumbsUp size={32} color="#15B6D6" />
                É Filhote? <br />
                Sim!
              </div>
              ) : (
              <div className="puppy">
                <FiThumbsDown size={32} color="#15B6D6" />
                É Filhote? <br />
                Não!
              </div>
              )
            }
              {pet.big ? (
                <div className="big">
                <FaExpandAlt size={32} color="#39CC83" />
                Achamos que ficará grande <br />
                Ideal para quem tem um amplo espaço!
                </div>
              ) : (
                <div className="big">
                <FaExpandAlt size={32} color="#39CC83" />
                Achamos que não ficará grande <br />
                Ótimo para quem nao possui muito espaço!
                </div>
              )
            }
            </div>

            <hr />

            <div className="map-container">
            <Map 
              center={[pet.latitude, pet.longitude]} 
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
              <Marker interactive={false} icon={mapIcon} position={[pet.latitude, pet.longitude]} />
            </Map>

            <footer>
              <a target="_blank" rel="noopener no referrer" href={`https://www.google.com/maps/dir/?api=1&destination=${pet.latitude},${pet.longitude}`}>Ver rotas no Google Maps</a>
            </footer>
          </div>

            <button type="button" className="contact-button" onClick={ () => { window.open(`https://api.whatsapp.com/send?phone=${pet.userNumber}&text=`)}}>
              
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
              
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}