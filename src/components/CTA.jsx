import React from 'react'

const CTA = () => {

    const img = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vayne_11.jpg"

  return (
    <div className='justify-center flex mt-12'>
        <div className='w-[1200px] h-40 bg-[url("https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Katarina_10.jpg")] bg-black bg-cover border-2 border-white bg-top bg-opacity-80 rounded-lg justify-center px-12 flex flex-col bg-url[(")]'>
            <h1 className='text-5xl font-semibold text-white'>Ganhe dinheiro jogando ranqueada !</h1>

            <p className='font-semibold text-white opacity-50 mt-2'>Única plataforma onde você pode usar sua habilidade para ganhar dinheiro!</p>
        </div>
    </div>
  )
}

export default CTA