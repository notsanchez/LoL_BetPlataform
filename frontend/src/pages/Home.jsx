import React from 'react'
import Active from '../components/Active'
import CTA from '../components/CTA'
import Header from '../components/Header'

const Home = () => {
  return (
    <div className='w-screen flex flex-col bg-secondaryblack items-center'>
        <div className='flex flex-col'>
            <CTA />
            <Active />
        </div>
    </div>
  )
}

export default Home