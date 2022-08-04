import React from 'react'
import InitialForm from '../components/InitialForm'

const Register = () => {

    return (
        <div className='w-screen h-screen bg-blackbg'>
            <div className='flex justify-center'>
                <div className='flex flex-col justify-center my-10 mx-1 h-auto w-[600px] drop-shadow-lg'>
                    <InitialForm/>
                </div>
            </div>
        </div>
    )
}

export default Register