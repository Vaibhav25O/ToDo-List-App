import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex bg-indigo-950 justify-around text-white py-2 ">
        <div className="logo">
            <span className='font-bold text-xl mx-8'>iTask</span>
        </div>

        <ul className="flex mx-9 gap-8">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Contact Us</li>
        </ul>    
       
    </nav>
  )
}

export default Navbar
