import React from 'react'

const Prov = () => {
  return (
    <div className='w-screen h-screen grid grid-cols-2 grid-rows-3 justify-between text-white font-semibold text-2xl px-[8%] py-8 bg-blackbg gap-4'>
        <div className='relative m-auto w-[100%] h-[100%] rounded-lg bg-cover hover:backdrop-opacity-60 bg-opacity-30' style={{ backgroundImage: `url("https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_LeagueofLegends_RiotGames_S1_2560x1440-ee500721c06da3ec1e5535a88588c77f")` }}>
            <h1 className='absolute top-[50%] bottom-[50%] ml-[42%]'>JOGUE AGORA</h1>
            <button className='w-[100%] h-[100%] bg-black opacity-0 hover:opacity-70 transition-all duration-150 rounded-lg'></button>
        </div>
        <button className='m-auto w-[100%] h-[100%] rounded-lg bg-secondaryblack'>
          <h1>SOBRE</h1>
        </button>
        <button className='m-auto w-[100%] h-[100%] rounded-lg bg-secondaryblack'>
          <h1>COMUNIDADE</h1>
        </button>
        <button className='m-auto w-[100%] h-[100%] rounded-lg bg-secondaryblack'>
          <h1>CARIDADE</h1>
        </button>
        <button className='m-auto w-[100%] h-[100%] rounded-lg bg-secondaryblack'>
          <h1>OUTROS JOGOS</h1>
        </button>
        <button className='m-auto w-[100%] h-[100%] rounded-lg bg-secondaryblack'>
          <h1>RETIRAR CRÉDITOS</h1>
        </button>
    </div>
  )
}

export default Prov