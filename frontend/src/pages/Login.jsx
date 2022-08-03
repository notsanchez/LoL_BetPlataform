import React, { useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

const Login = () => {
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    axios.get('http://localhost:3001/user/?email=' + email).then((res) => {
      if (password === res.data[0].password) {
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
    <div>
      <div className='flex justify-center tracking-wide'>
        <div className='flex flex-col justify-center my-10 mx-1 h-auto w-[400px]'>
          <form onSubmit={handleLogin} method='POST' id='form' className='bg-secondaryblack rounded-xl p-6 m-auto my-1 w-[100%]'>
            {error !== '' ? (<div className='py-2 border-2 text-center rounded-2xl text-red-900 border-red-900' id='login-warning-block'>
              <span className='text-sm'>&#9888; {error}</span>
            </div>) : ''}
            <div>
              <div className='my-2'>
                <span>Email</span>
              </div>
              <input className='p-2 rounded-md w-[100%]' name='email' type="email" id='email' required></input>
            </div>
            <br></br>
            <div className='ml-auto justify-between'>
              <div className='my-2 flex justify-between'>
                <span>Senha</span>
                <Link to='/' className='text-primary'>Esqueceu a senha?</Link>
              </div>
              <input className='p-2 rounded-md w-[100%]' name='password' type="password" id='password' required></input>
            </div>
            <input className='rounded-md mt-10 bg-primary py-2 px-4 w-[100%] cursor-pointer font-semibold text-lg' type="submit" value="Login"></input>
            <div className='flex justify-between mt-4'>
              <span>Novo aqui?</span>
              <Link to="/register" className='text-primary'>Crie uma conta</Link>
            </div>
          </form>
          <div>
          </div>
          <div className='flex justify-between text-center text-primary'>
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