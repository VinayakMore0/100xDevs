import React from 'react'

const SidebarClass1 = () => {
  return (
    <div className='flex w-full min-h-full'>
        <div className='transition-all ease-in-out duration-600 md:translate-x-0 -translate-x-96 h-full w-0 md:w-96'>
            Sidebar
        </div>
        <div className='w-full h-full bg-green-800'>
            Content
        </div>
    </div>
  )
}

export default SidebarClass1