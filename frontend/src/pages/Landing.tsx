import React from 'react';
import '../styles/pages/landing.css'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'

function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={Logo} alt="Tico" className="logo"></img>
        <main>
          <h1>Adote um Pet</h1>
          <p>Entre para ver os animais perto de você que estão esperando por um lar!</p>
        </main>
        <div className="location">
          <strong>Cascavel</strong>
          <span>Paraná</span>
        </div>
        <Link to="/list" className="enter-app">
          <FiArrowRight size={26} color="#fff"/>
        </Link>
      </div>
    </div>
  )
}

export default Landing
