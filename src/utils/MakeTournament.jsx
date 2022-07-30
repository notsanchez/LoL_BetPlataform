import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'

const MakeTournament = () => {

    const { id } = useParams()
    const [players, setPlayers] = useState('')
    const [puuid, setPuuid] = useState('')
    const [matches, setMatches] = useState('')
    const [result, setResult] = useState('')

    const summoner = "sxsh"
    const API_KEY = "RGAPI-7cc76c98-125b-44a7-ad0a-7bba3895dc3e"

    useEffect(() => {
        axios.get('http://localhost:3001/tournament/' + id ).then((res) => {   
        setPlayers(res.data.players)
      })
    },[])

    const makeRiotRequest = () => {
        useEffect(() => {
            axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${API_KEY}`).then(function(res){
                setPuuid(res.data.puuid)
            }).catch(function(err){
              console.log(err)
            })
        },[])

        setTimeout(() => {
          axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=3&api_key=${API_KEY}`).then(function(res){
                setMatches(res.data)
            }).catch(function(err){
              console.log(err)
            })
        }, 5000);

        setTimeout(() => {
          axios.get('https://americas.api.riotgames.com/lol/match/v5/matches/BR1_2562950883?api_key=RGAPI-a2297d20-d955-4890-b66b-5154f3bb7331').then(function(res){
            setResult(res.data.info.participants.filter(summ=> summ.puuid === puuid))
          }).catch(function(err){
            console.log(err)
          })
        }, 7000);

    }

    console.log(result.kills)

    

    {/* setTimeout(() => {
        axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=3&api_key=${API_KEY}`).then(function(res){
                setMatches(res.data)
                setTimeout(() => {
                    axios.get('https://americas.api.riotgames.com/lol/match/v5/matches/BR1_2562950883?api_key=RGAPI-a2297d20-d955-4890-b66b-5154f3bb7331').then(function(res){
                    setResult(res.data.info.participants.filter(summ=> summ.puuid === puuid))
                    })
                }, 5000);
          })
    }, []); */}

    makeRiotRequest()



    return (
        <div className='w-screen h-screen bg-blackbg'>
            
            <div className='w-screen h-screen flex flex-col items-center'>
              <div className='w-[1200px] h-[800px] bg-secondaryblack items-center justify-evenly text-white flex flex-col mt-12 rounded-lg'>
                <div className='flex flex-col items-center justify-center'>
                  <h1 className='text-2xl font-bold'>League of legends</h1>
                  <h1 className='text-2xl font-bold'>Vencedor: </h1>
                </div>
              </div>
            </div>
        </div>
      )
}

export default MakeTournament