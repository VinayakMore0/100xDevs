import React from 'react'

const Input = ({onClick, type, placeholder}) => {
  return (
    <span onClick={onClick} className={`px-2 py-2 text-white cursor-pointer bg-blue-500 p-8 rounded-2xl text-4xl`}>
      <input type="type" placeholder={placeholder} className='bg-blue-200 outline-none' />
    </span>
  )
}

export default Input