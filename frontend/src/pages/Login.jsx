import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import ErrorHandler from '../components/ErrorHandler'

const Login = () => {
  const [error, setError] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    axios.get('http://localhost:3001/user/?email=' + email).then((res) => {
      if (res.data.length === 0) {
        setError('Email ou senha incorreto')
      } else if (password === res.data[0].password) {
        localStorage.setItem("user", res.data[0].id)
        window.location.replace("/")
      } else {
        setError('Email ou senha incorreto')
      }
    }).catch(function (err) {
      console.log(err)
    })
  }

  return (
    <div className='w-screen h-screen bg-blackbg font-semibold'>
      <div className='flex justify-center'>
        <div className='flex flex-col justify-center my-10 mx-1 h-auto w-[400px]'>
          <form onSubmit={handleLogin} method='POST' id='form' className='bg-secondaryblack rounded-xl p-6 m-auto my-1 w-full'>
            <div className='flex items-center justify-center text-white text-2xl my-6'>
              <h1>Entre na sua conta</h1>
            </div>
            <ErrorHandler error={error}/>
            <div>
              <div className='my-2 text-white'>
                <span>Email</span>
              </div>
              <input
                className='p-2 rounded-md w-full bg-blackbg text-white'
                name='email'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <br></br>
            <div className='ml-auto justify-between'>
              <div className='my-2 flex justify-between text-white'>
                <span>Senha</span>
                <Link to='/' className='text-pinktext'>Esqueceu a senha?</Link>
              </div>
              <input
                className='p-2 rounded-md w-full bg-blackbg text-white'
                name='password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <input className='rounded-md mt-10 bg-primary py-2 px-4 w-full cursor-pointer font-semibold text-lg text-white' type="submit" value="Login"></input>
            <div className='flex justify-between mt-4 text-white'>
              <span>Novo aqui?</span>
              <Link to="/register" className='text-pinktext'>Crie uma conta</Link>
            </div>
          </form>
          <div>
          </div>
          <div className='flex justify-between text-center text-pinktext my-2'>
            <Link to='/'>Termos de serviço</Link>
            <Link to='/'>Privacidade</Link>
            <Link to='/'>Sobre nós</Link>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Login