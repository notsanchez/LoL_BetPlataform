import React, { useState } from 'react'
import axios from 'axios'
import InputMask from "react-input-mask"

const Register = () => {
    const [error, setError] = useState('')

    const createAccount = (e) => {
        e.preventDefault()

        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const pw = document.getElementById('password').value
        const c_pw = document.getElementById('c_password').value

        const cpf = document.getElementById('cpf').value
        const phone = document.getElementById('phone').value
        const birthday = document.getElementById('birthday').value

        if (pw !== c_pw) {
            setError('As senhas precisam ser iguais')
            return
        }

        axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${import.meta.env.VITE_API_KEY}`)
            .then((res) => {
                axios.post('http://localhost:3001/user', {
                    "id": name,
                    "puuid": res.data.puuid,
                    "email": email,
                    "password": pw,
                    "cpf": cpf,
                    "phone": phone,
                    "birthday": birthday,
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
                    <div className='flex flex-row gap-4'>
                        <InputMask mask="999.999.999-99" className='flex p-2 rounded-md w-[100%] my-2' name='cpf' id="cpf" placeholder='CPF' required />
                        <InputMask mask="+55 (99)999999999" className='flex p-2 rounded-md w-[100%] my-2' name='phone' id="phone" placeholder='TELEFONE' required />
                    </div>
                    <InputMask mask="99/99/9999" className='flex p-2 rounded-md w-[100%] my-2' name='birthday' placeholder="DATA DE NASCIMENTO" id='birthday' type="text" required />
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