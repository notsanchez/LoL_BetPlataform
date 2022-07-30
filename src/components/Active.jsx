import React from 'react'
import ActiveTournaments from './ActiveTournaments'

const Active = () => {
  return (
    <div className='mt-24'>
        <h1 className='text-2xl text-white font-semibold'>Torneios ativos</h1>

        <div className='my-12 flex items-center justify-center'>
            <ActiveTournaments />
        </div>
    </div>
  )
}

export default Active