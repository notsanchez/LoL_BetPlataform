import React from 'react'
import Active from '../components/Active'
import CTA from '../components/CTA'

const Home = () => {
  return (
    <div className='w-screen h-screen flex flex-col bg-secondaryblack items-center'>
      <div className='flex flex-col'>
        <CTA />
        <Active />
      </div>
    </div>
  )
}

export default Home