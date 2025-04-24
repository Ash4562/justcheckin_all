import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between p-8 '>
      <div >
        <img src="/brand_logo.png" alt="" />
      </div>
      <div className=''>
        <nav className=' '>
          <ul className='flex  gap-16 text- cursor-pointer'>
            <li>Menu</li>
            <li>Location</li>
            <li>About </li>
            <li>Contact</li>
          </ul>

        </nav>
      </div>
      <div >
        < button className='bg-red-600 text-white px-8 py-3'>Login</button>
      </div>
    </div>
  )
}

export default Navbar