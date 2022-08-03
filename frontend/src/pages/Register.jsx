import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import CPFInput from './Inputs/CPFInput'
// import TELInput from './Inputs/TELInput'
// import BirthdayInput from './Inputs/BirthdayInput'

const Register = () => {
    const API_KEY = "RGAPI-7a240ccf-e23d-4877-8576-49c4667893e5"

    const [error, setError] = useState('')

    const [states, setStates] = useState('')
    const [cities, setCities] = useState('')

    const createAccount = (e) => {
        e.preventDefault()

        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const pw = document.getElementById('password').value
        const c_pw = document.getElementById('c_password').value

        // Collection
        // const document_id = document.getElementById('document_id').value
        // const phone = document.getElementById('phone').value
        // const birthday = document.getElementById('birthday').value

        const warningBlock = document.getElementById('register-warning-block')
        if (pw !== c_pw) {
            setError('As senhas precisam ser iguais')
            return
        }

        axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`)
            .then((res) => {
                axios.post('http://localhost:3001/user', {
                    "id": name,
                    "puuid": res.data.puuid,
                    "email": email,
                    "password": pw,
                    "lastGameID": "",
                    "activeTournamentID": -1,
                    "credits": 0
                })
                    .then((res) => {
                        localStorage.setItem("user", res.data.id)
                        window.location.replace("/")
                    })
                    .catch((err) => {
                        console.error(err)
                        setError('Este email já foi usado')
                    })
            }).catch((err) => {
                console.log(err)
            })


    }

    return (
        <div className='flex justify-center tracking-wide'>
            <div className='flex flex-col justify-center my-10 mx-1 h-auto w-[600px]'>
                <form className='flex flex-col bg-secondaryblack rounded-xl p-6 m-auto my-1 w-[100%]' onSubmit={createAccount} id='form'>
                    <h1 className='text-2xl text-white font-semibold text-center mb-4'>Preencha seus dados</h1>
                    {error !== '' ? (<div className='mb-4 py-2 border-2 text-center rounded-2xl text-red-900 border-red-900' id='register-warning-block'>
                        <span>&#9888; {error}</span>
                    </div>) : ''}
                    <input className='flex p-2 rounded-md w-[100%] my-2' id='name' name='name' type="text" minLength={3} placeholder='NICK ATUAL (LEAGUE OF LEGENDS)' required></input>
                    <div className='register-flex-2-col id-phone-container'>
                        {/* <CPFInput />
                        <TELInput /> */}
                    </div>
                    {/* <BirthdayInput /> */}
                    <input className='flex p-2 rounded-md w-[100%] my-2' name='email' type="email" id='email' placeholder='E-MAIL' required></input>
                    <input className='flex p-2 rounded-md w-[100%] my-2' name='password' type="password" minLength='6' id='password' placeholder='SENHA' required></input>
                    <input className='flex p-2 rounded-md w-[100%] my-2' name='c_password' type="password" id='c_password' placeholder='CONFIRMAR SENHA' required></input>
                    <div className='checkbox-container text-xs'>
                        <div className='flex py-2'>
                            <input className='cursor-pointer' type="checkbox" name='terms-of-service' id='terms-of-service' required></input>
                            <label className='cursor-pointer ml-2 my-auto' htmlFor='terms-of-service'>LI E ACEITO OS TERMOS DE USO E POLÍTICA DE PRIVACIDADE</label>
                        </div>
                        <div className='flex py-2'>
                            <input className='cursor-pointer' type="checkbox" name='veridical-term' id='veridical-term' required></input>
                            <label className='cursor-pointer ml-2 my-auto' htmlFor='veridical-term'>DECLARO QUE TODAS AS INFORMAÇÕES PREENCHIDAS NESTE CADASTRO SÃO VERÍDICAS</label>
                        </div>
                    </div>
                    <div className='submit-container'>
                        <input className='rounded-md mt-10 bg-primary py-2 px-4 w-[100%] cursor-pointer font-semibold text-lg' type="submit" value='FINALIZAR CADASTRO'></input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register