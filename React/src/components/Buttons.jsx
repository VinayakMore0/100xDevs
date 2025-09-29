import React from 'react'

const Buttons = ({disabled, children, onClick}) => {
  return (
    <span onClick={onClick} className={`px-32 py-8 text-white cursor-pointer ${disabled ? "bg-blue-200" : "bg-green-400"} rounded-2xl text-4xl`}>
      {children}
    </span>
  )
}

export default Buttons