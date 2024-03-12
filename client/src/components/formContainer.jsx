import React from 'react'

const FormContainer = ({children}) => {
  return (
    <div className='lg:w-1/2 w-full h-full flex items-center justify-center'>
    <div className='w-fit md:min-w-96'>{children} </div>
        </div>
)
}

export default FormContainer