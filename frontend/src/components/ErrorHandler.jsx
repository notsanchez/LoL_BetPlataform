import React from 'react'

const ErrorHandler = ({error}) => {
    return (
        <>
            {error !== '' ? (<div className='mb-4 px-4 py-2 border-2 text-center rounded-2xl text-red-900 border-red-900'>
                <span className='text-sm'>&#9888; {error}</span>
            </div>) : ''}
        </>
    )
}

export default ErrorHandler
