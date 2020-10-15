import React, { FormEvent, useState } from "react"
import { Map, Marker, TileLayer } from 'react-leaflet'
import { LeafletMouseEvent } from "leaflet"
import { FiPlus } from "react-icons/fi"
import Sidebar from "../components/Sidebar"

import '../styles/pages/create-pet.css'
import mapIcon from "../utils/mapIcon"

export default function CreatePet() {
const [position, setPosition] = useState({ latitude: 0, longitude: 0})

const [name, setName] = useState('')
const [about, setAbout] = useState('')
const [userName, setUserName] = useState('')
const [userNumber, setUserNumber] = useState('')
const [big, setBig] = useState('')
const [puppy, setPuppy] = useState('')

  
  function handleMapClick(event: LeafletMouseEvent){
    const {lat, lng} = event.latlng
    
    setPosition({
      latitude: lat, 
      longitude: lng,
    })
  }
  
  function handleSubmit(event: FormEvent) {
    event.preventDefault()

  }

  return (
    <div id="page-create-pet">
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className="create-pet-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
              />
              { position.latitude !== 0 && (
              <Marker 
                interactive={false} 
                icon={mapIcon} 
                position={[
                  position.latitude,
                  position.longitude
                ]} 
              />
              ) }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image">

              </div>

              <button className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </button>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                value={about} 
                onChange={event => setAbout(event.target.value)}
                maxLength={300}
              />
            </div>

            <div className="input-block">
              <label htmlFor="boolean">É filhote?</label>

              <div className="button-select">
                <button type="button" className="active">Sim</button>
                <button type="button">Não</button>
              </div>
            </div>

            <div className="input-block">
              <label htmlFor="boolean">Você acha que ele sera grande?</label>

              <div className="button-select">
                <button type="button" className="active">Sim</button>
                <button type="button">Não</button>
              </div>
            </div>

          </fieldset>

          <fieldset>
            <legend>Seus Dados</legend>

            <div className="input-block">
              <label htmlFor="instructions">Seu Nome</label>
              <input 
                id="instructions" 
                value={userName} 
                onChange={event => setUserName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Seu WhatsApp</label>
              <input 
                id="opening_hours" 
                value={userNumber} 
                onChange={event => setUserNumber(event.target.value)}
                maxLength={11}
              />
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

