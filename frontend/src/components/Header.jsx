import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

  const handleLogout = () => {
    localStorage.clear()
    window.location.replace("/");
  }

  return (
    <div className='flex flex-col'>
      <div className='w-screen h-24 bg-blackbg flex items-center justify-between text-white px-12 drop-shadow-lg'>
        <h1 className='text-5xl font-bold'>Nine<span className='text-primary'>Bet.gg</span></h1>

        <div className='flex gap-6'>
          <button className='bg-primary px-6 py-2 rounded-lg font-semibold text-lg' onClick={handleLogout}>Entrar</button>
        </div>
      </div>

      <div className='w-screen h-12 bg-secondaryblack border-b-2 border-opacity-40 border-white items-center flex justify-center gap-24 text-white font-semibold text-lg'>
        <Link to="/home">
          <button className='py-2 focus:border-b-4 border-primary transition-all duration-150'>Inicio</button>
        </Link>
        <Link to="/">
          <button className='py-2 focus:border-b-4 border-primary transition-all duration-150'>Torneios</button>
        </Link>

        <button className='py-2 focus:border-b-4 border-primary transition-all duration-150'>Quem somos</button>
      </div>


    </div>
  )
}

export default Header