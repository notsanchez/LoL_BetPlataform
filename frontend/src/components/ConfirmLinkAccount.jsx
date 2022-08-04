import React from 'react'
import axios from 'axios'

const ConfirmLinkAccount = ({ uuid, name, email, phone, pw, cpf }) => {

    const createAccount = (e) => {
        e.preventDefault()

        axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${uuid}?api_key=RGAPI-657d93a8-e20f-435f-b446-99b81a0bb692`).then((res) => {
            if(res.data.profileIconId === randomImgNumber){
                axios.post('http://localhost:3001/user', {
                    "id": name,
                    "puuid": res.data.puuid,
                    "email": email,
                    "password": pw,
                    "cpf": cpf,
                    "phone": phone,
                    "credits": 0
                })
                    .then((res) => {
                        localStorage.setItem("user", res.data.id)
                        window.location.replace("/")
                    })
            } else {
                console.log("diferente")
            }
        })
    }

    console.log(name, email, phone, pw, cpf)

    const randomImgNumber = Math.floor(Math.random() * 20) + 1

    const randomImg = `https://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/${randomImgNumber}.png`

    return(
        <div>
            <form className='flex flex-col bg-secondaryblack items-center text-black font-semibold rounded-xl p-6 m-auto my-1 w-[100%]' id='form'>
                <h1 className='font-semibold text-white text-xl text-center py-6'>Selecione esse icone de invocador em sua conta. Em seguida clique em finalizar cadastro</h1>
                <img src={randomImg} className='w-44 object-cover rounded-full' />
                <div className='submit-container'>
                    <button className='rounded-md mt-10 bg-primary text-white py-2 px-4 w-[100%] cursor-pointer font-semibold text-lg' type="button" onClick={createAccount}>FINALIZAR CADASTRO</button>
                </div>
            </form>
        </div>
    )
}

export default ConfirmLinkAccount