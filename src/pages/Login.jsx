import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Login = () => {

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    
    const handleLogin = () => {
        axios.get('http://localhost:3001/user/' + user ).then(function(res){
          if(pass == res.data.password){
            localStorage.setItem("user", user)
            window.location.replace("/");
          } else{
            console.log('credenciais erradas')
          }
        }).catch(function(err){
          console.log(err)
        })
    }

  return (
    <div>
        <input type="text" value={user} onChange={(e) => setUser(e.target.value)}/>
        <input type="password" placeholder='digite sua senha' value={pass} onChange={(e) => setPass(e.target.value)}/>

        <button className='bg-red-500' onClick={handleLogin}>entrar</button>
    </div>
  )
}

export default Login