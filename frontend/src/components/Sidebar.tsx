import React from 'react'
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import LogoSmall from '../assets/LogoSmall.png'
import '../styles/components/sidebar.css'

export default function Sidebar() {
  const { goBack } = useHistory();
  
  return (
      <aside className="app-sidebar">
        <img src={LogoSmall} alt="Tico"/>

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
  )
}