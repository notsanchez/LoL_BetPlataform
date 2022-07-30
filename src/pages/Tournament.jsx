import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'

const Tournament = () => {
  const { id } = useParams()

  const user = localStorage.getItem("user")

  const [data, setData] = useState('')
  const [players, setPlayers] = useState('')

  const find = Array.from(players).find(player => player === user)

    useEffect(() => {
      axios.get('http://localhost:3001/tournament/' + id ).then((res) => {   
        setData(res.data)
        setPlayers(res.data.players)
      }).catch(function(err){
        console.log(err)
        })

      const interval = setInterval(() => {
        axios.get('http://localhost:3001/tournament/' + id ).then((res) => {   
        setData(res.data)
        setPlayers(res.data.players)
        }).catch(function(err){
          console.log(err)
        })
      }, 2000);
      return () => clearInterval(interval);
    },[])

    const entryTournament = () => {
      if(find === undefined && players.length < data.totalPlayers){
        axios.patch('http://localhost:3001/tournament/' + id, {
          players: [...players, user]
        }).then(function(){
          console.log("entrou")
        })
      } else {
        console.log("ja tem no banco ou cheio")
      }
    }

    if(players.length === data.totalPlayers){
      window.location.replace(`/tournamentlive/${id}`);
    }


  return (
    <div className='w-screen h-screen bg-blackbg'>
        
        <div className='w-screen h-screen flex flex-col items-center'>
          <div className='w-[1200px] h-[800px] bg-secondaryblack items-center justify-evenly text-white flex flex-col mt-12 rounded-lg'>
            <div className='flex flex-col items-center justify-center'>
              <h1 className='text-2xl font-bold'>League of legends</h1>
              <h1 className='text-2xl font-bold'>Jogadores no lobby: {players.length}/{data.totalPlayers}</h1>
            </div>

            <h1>{JSON.stringify(players)}</h1>

            <button className='text-2xl bg-primary py-2 px-12 rounded-lg' onClick={entryTournament}>Participar</button>
          </div>
        </div>
    </div>
  )
}

export default Tournament