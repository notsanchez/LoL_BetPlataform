import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ActiveTournaments = () => {
    const [tournaments, setTournaments] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/tournament/').then(value => {
            setTournaments(value.data)
        }).catch(err => {
            console.log(err)
        })
    },[])

    
  return (
    <div className='grid grid-cols-4 gap-6'>
    {tournaments.map((tournament) => (
        <div key={tournament.id} className='w-[300px] h-[490px] bg-blackbg bg-opacity-50 rounded-lg flex flex-col justify-center items-center text-white border-2 border-white'>
            <div className='flex flex-col items-center justify-evenly drop-shadow-lg'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-2xl font-bold'>League of Legends</h1>
                    <h1 className='text-md font-bold'>{tournament.players.length}/{tournament.totalPlayers}</h1>
                </div>

                <div className='flex flex-col items-center'>
                    <h1 className='text-lg font-semibold'>Premio</h1>
                    <h1 className='text-4xl font-bold'>R$ {tournament.reward}</h1>
                </div>
            </div>

            <div className='grid grid-rows-3 grid-flow-col justify-center gap-6'>

                <div className='flex flex-col'>
                    <h1 className='text-lg font-semibold opacity-80'>Modo</h1>
                    <h1 className='text-xl font-bold'>{tournament.mode}</h1>
                </div>

                <div className='flex flex-col'>
                    <h1 className='text-lg font-semibold opacity-80'>Entrada</h1>
                    <h1 className='text-xl font-bold'>R$ {tournament.tax}</h1>
                </div>

                <div className='flex flex-col'>
                    <h1 className='text-lg font-semibold opacity-80'>Pontuação</h1>
                    <h1 className='text-xl font-bold'>{tournament.bestOf}</h1>
                </div>

                <div className='flex flex-col'>
                    <h1 className='text-lg font-semibold opacity-80'>Duração</h1>
                    <h1 className='text-xl font-bold'>{tournament.duration} Horas</h1>
                </div>

                <div className='flex flex-col'>
                    <h1 className='text-lg font-semibold opacity-80'>Players</h1>
                    <h1 className='text-xl font-bold'>{tournament.totalPlayers}</h1>
                </div> 

            </div>

            {tournament.players.length >= tournament.totalPlayers ? (
                <button className='bg-black bg-opacity-30 py-2 px-12 mt-4 rounded-md text-xl font-semibold text-center' disabled>Cheio</button>
                ) : (
                    <>
                        <Link to={'/tournament/' + tournament.id}>
                            <button className='bg-primary py-2 px-12 mt-4 rounded-md text-xl font-semibold'>Participar agora</button>
                        </Link>
                    </>
            )}
            
        </div>
        ))}
    </div>
  )
}

export default ActiveTournaments