import React from 'react'

const Navbar = () => {
  return (
    <nav className='text-white bg-slate-800'>
      <div className="flex items-center justify-between px-5 py-5 mycontainer h-14">
        <div className='text-2xl font-bold text-white logo'>
          <span className='text-green-600'>&lt;</span>
          <span>Pass</span>
          <span className='text-green-600'>OP/&gt;</span>
        </div>
        {/* <ul>
            <li className='flex gap-7'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="/">About</a>
                <a className='hover:font-bold' href="/">Contact</a>
            </li>
        </ul> */}
        <button className='flex items-center justify-between mx-2 my-5 text-white bg-green-700 rounded-full cursor-pointer ring-white ring-1'>
          <img className='w-10 p-1 invert' src="icons/github-mark-white.png" alt="" />
          <span className='px-2 font-bold'>GitHub</span>
        </button>
        </div>
    </nav>
  )
}

export default Navbar
