import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'

const Tournament = () => {
  const { id } = useParams()

  const API_KEY = "RGAPI-e36d9d69-7cca-4019-8aac-ec173989fd80"

  const user = localStorage.getItem("user")

  const [tournament, setTournament] = useState('')
  const [players, setPlayers] = useState([])
  const [userData, setUserData] = useState('')
  const [kdaTotal, setKdaTotal] = useState('')

  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    getTournament()

    calculateKDA()

    // Pega informações do usuario
    axios.get('http://localhost:3001/user/' + user).then((res) => {
      setUserData(res.data)
    }).catch(function (err) {
      console.log(err)
    })

    const interval = setInterval(() => {
      getTournament()
    }, 2000);
    return () => clearInterval(interval);
  }, [])

  // Pega informações do torneio
  const getTournament = () => {
    axios.get('http://localhost:3001/tournament/' + id).then((res) => {
      setTournament(res.data)
      setPlayers(res.data.players)
    }).catch(function (err) {
      console.log(err)
    })
  }

  const entryTournament = () => {
    if (!players.includes(user) && players.length < tournament.totalPlayers) {
      axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${userData.puuid}/ids?queue=420&type=ranked&start=0&count=1&api_key=${API_KEY}`)
        .then((res) => {
          if (res.data.length === 1) {
            // Pega a ultima partida do usuario e falha se nao conseguir achar
            axios.patch('http://localhost:3001/user/' + user, {
              lastGameID: res.data[0]
            }).catch((err) => {
              console.log(err)
            })
            // Coloca usuario na lista de players do campeonato
            axios.patch('http://localhost:3001/tournament/' + id, {
              players: [...players, user]
            }).then(() => {
              console.log("entrou")
            }).catch((err) => {
              console.log(err)
            })
          } else console.log('nao foi possivel achar última partida')
        })
    } else {
      console.log("ja tem no banco ou cheio")
    }
  }

  // Calcula KDA do usuario e confere se ele jogou os 3 jogos de acordo com seu ultimo jogo
  const calculateKDA = () => {
    axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${userData.puuid}/ids?queue=420&type=ranked&start=0&count=100&api_key=${API_KEY}`)
      .then((res) => {
        const lastGameIndex = res.data.indexOf(userData.lastGameID)
        let kdaSum = 0

        if (lastGameIndex < 3) console.log('nao jogou os 3 jogos')
        else {
          const lastGames = res.data.filter((game, i) => [lastGameIndex - 1, lastGameIndex - 2, lastGameIndex - 3].some(j => i === j))
          lastGames.forEach((matchID) => {
            axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${API_KEY}`)
              .then((res) => {
                kdaSum += res.data.info.participants.find((kda) => kda.puuid === userData.puuid).challenges['kda']
              }).catch((err) => {
                console.log(err)
              })
          })
        }
      })
  }

  return (
    <div className='w-screen h-screen bg-blackbg'>
      <div className='w-screen h-screen flex flex-col justify-between'>
        <div className='w-[1200px] h-[800px] bg-secondaryblack justify-evenly text-white flex flex-col m-auto mt-12 px-6 rounded-lg'>
          {(players.includes(localStorage.getItem("user"))) ? (
            <>
              <div className='flex flex-col items-center justify-center'>
                <h1 className='font-bold text-4xl my-2'>League of legends</h1>
                <h2 className='font-bold text-xl my-1'>Jogadores no lobby: {players.length} / {tournament.totalPlayers}</h2>
                <h2 className='font-bold text-xl my-1'>Partidas Jogadas: 0 / 3</h2>
                <h2 className='font-bold text-xl my-1'>Aguardando Quantidade Mínima de Jogadores (40)</h2>
                <h2 className='font-bold text-xl my-1'>{minutes} : {seconds}</h2>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <table className='text-center bg-blackbg rounded-lg text-xl border-separate border border-spacing-2'>
                  <thead>
                    <tr>
                      <th colSpan="2" className='px-6 py-2'>Players</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((player, i) =>
                      <tr key={i} className='bg-secondaryblack'>
                        <td className='px-2 py-1 rounded-lg font-semibold'>
                          {i + 1}
                        </td>
                        <td className='px-6 py-1 rounded-lg'>
                          {player}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <table className='text-center bg-blackbg rounded-lg text-xl border-separate border border-spacing-2'>
                  <thead>
                    <tr>
                      <th colSpan="2" className='px-6 py-2'>Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((player, i) =>
                      <tr key={i} className='bg-secondaryblack'>
                        {i === 0 ? <td className='px-2 py-1 rounded-lg font-semibold text-gold'> {i + 1} </td> :
                          i === 1 ? <td className='px-2 py-1 rounded-lg font-semibold text-silver'> {i + 1} </td> :
                            i === 2 ? <td className='px-2 py-1 rounded-lg font-semibold text-bronze'> {i + 1} </td> :
                              <td className='px-2 py-1 rounded-lg font-semibold '> {i + 1} </td>}

                        <td className='px-6 py-1 rounded-lg'>
                          {player}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (

            <>
              <div className='flex flex-col items-center justify-center'>
                <h1 className='font-bold text-4xl my-2'>League of legends</h1>
                <h1 className='font-bold text-xl my-1'>Jogadores no lobby: {players.length} / {tournament.totalPlayers}</h1>
              </div>

              <button className='mx-auto bg-primary py-2 px-12 rounded-lg' onClick={entryTournament}>Participar</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Tournament