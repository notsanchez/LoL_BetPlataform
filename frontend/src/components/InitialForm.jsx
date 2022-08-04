import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InputMask from "react-input-mask"
import ConfirmLinkAccount from './ConfirmLinkAccount'

const InitialForm = () => {

    const [error, setError] = useState('')
    const [ uuid, setUuid ] = useState('')

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ pw, setPw ] = useState('')
    const [ cpw, setCpw ] = useState('')
    const [ cpf, setCpf ] = useState('')
    const [ phone, setPhone ] = useState('')

    const [ form, setForm ] = useState(1)


    const getUuid = (e) => {
        e.preventDefault()

        axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=RGAPI-657d93a8-e20f-435f-b446-99b81a0bb692`).then((res) => {
            setUuid(res.data.puuid)
            setForm(2)
        })
    }

    return(
        <>
        {form === 1 ? (
        <>
            <div className='flex flex-col bg-secondaryblack text-black font-semibold rounded-xl p-6 m-auto my-1 w-[100%]' >
                    <h1 className='text-2xl text-white font-semibold text-center mb-4'>Preencha seus dados</h1>
                    {error !== '' ? (<div className='mb-4 py-2 border-2 text-center rounded-2xl text-red-900 border-red-900' id='register-warning-block'>
                        <span>&#9888; {error}</span>
                    </div>) : ''}
                    <input className='flex p-2 rounded-md w-[100%] my-2' 
                        type="text" 
                        placeholder='NOME DE INVOCADOR     ( ATUAL DO LEAGUE OF LEGENDS! )'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required />
                    <div className='flex flex-row gap-4'>
                        <InputMask 
                            mask="999.999.999-99" 
                            className='flex p-2 rounded-md w-[100%] my-2' 
                            placeholder='CPF' 
                            required
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                        <InputMask 
                            mask="+55 (99)999999999" 
                            className='flex p-2 rounded-md w-[100%] my-2' 
                            placeholder='TELEFONE' 
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <input 
                        className='flex p-2 rounded-md w-[100%] my-2' 
                        type="email" 
                        placeholder='E-MAIL'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required>        
                    </input>
                    <input 
                        className='flex p-2 rounded-md w-[100%] my-2' 
                        type="password" 
                        minLength='6' 
                        placeholder='SENHA' 
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        required>
                    </input>
                    <input 
                        className='flex p-2 rounded-md w-[100%] my-2' 
                        type="password" 
                        placeholder='CONFIRMAR SENHA'
                        value={cpw}
                        onChange={(e) => setCpw(e.target.value)}
                        required>
                    </input>

                <div className='submit-container'>
                    <input className='rounded-md mt-10 bg-primary text-white py-2 px-4 w-[100%] cursor-pointer font-semibold text-lg' onClick={getUuid} type="submit" value='SEGUINTE >'></input>
                </div>
            </div>
        </>
        ) : (
            <><ConfirmLinkAccount uuid={uuid} name={name} email={email} pw={pw} cpf={cpf} phone={phone}/></>
        )}
        </>
        
    )
}

export default InitialForm