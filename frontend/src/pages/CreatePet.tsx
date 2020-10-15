import React, { ChangeEvent, FormEvent, useState } from "react"
import { Map, Marker, TileLayer } from 'react-leaflet'
import { LeafletMouseEvent } from "leaflet"
import { FiPlus } from "react-icons/fi"
import Sidebar from "../components/Sidebar"

import '../styles/pages/create-pet.css'
import mapIcon from "../utils/mapIcon"
import api from "../services/api"
import { useHistory } from "react-router-dom"

export default function CreatePet() {
  const history = useHistory()
  const [position, setPosition] = useState({ latitude: 0, longitude: 0})

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [userName, setUserName] = useState('')
  const [userNumber, setUserNumber] = useState('')
  const [big, setBig] = useState(false)
  const [puppy, setPuppy] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
    
  function handleMapClick(event: LeafletMouseEvent){
    const {lat, lng} = event.latlng
    
    setPosition({
      latitude: lat, 
      longitude: lng,
    })
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return
    }
    
    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })

    setPreviewImages(selectedImagesPreview)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const { latitude, longitude } = position

    const data = new FormData()

    data.append('name', name)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('about', about)
    data.append('big', String(big))
    data.append('puppy', String(puppy))
    data.append('userName', userName)
    data.append('userNumber', userNumber)

    images.forEach(image => {
      data.append('images', image)
    })
    
    await api.post('pets', data).then

    alert("Cadastro Realizado!")

    history.push('/list')
  }

  return (
    <div id="page-create-pet">
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className="create-pet-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-24.95, -53.4547]}
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

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  )
                })}
                
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input 
                multiple 
                type="file" 
                id="image[]" 
                onChange={handleSelectImages}
              />
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
                <button 
                  type="button" 
                  className={puppy ? "active" : ""}
                  onClick={() => setPuppy(true)}
                >
                  Sim
                </button>
                <button 
                  type="button" 
                  className={!puppy ? "active" : ""} 
                  onClick={() => setPuppy(false)}
                >
                  Não
                </button>
              </div>
            </div>

            <div className="input-block">
              <label htmlFor="boolean">Você acha que ele sera grande?</label>
              <div className="button-select">
              <button 
                  type="button" 
                  className={big ? "active" : ""}
                  onClick={() => setBig(true)}
                >
                  Sim
                </button>
                <button 
                  type="button" 
                  className={!big ? "active" : ""} 
                  onClick={() => setBig(false)}
                >
                  Não
                </button>
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
              <label htmlFor="opening_hours">Número do WhatsApp</label>
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
  )
}

