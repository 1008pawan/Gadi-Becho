import React from 'react'

const Firstcard = ({num, heading, para}) => {

  return (
    <div className='border border-zinc-300 h-60 xl:w-70 w-110 rounded-xl text-center shadow-sm p-5'>
        <div className='flex justify-center items-center'>
            <div className={`size-15 rounded-full text-2xl font-bold flex justify-center items-center 
            ${num === '1' ? 'text-green-500 bg-green-200' : 'text-black'}
            ${num === '2' ? 'text-blue-500 bg-blue-200' : 'text-black'}
            ${num === '3' ? 'text-orange-500 bg-orange-200' : 'text-black'}
            ${num === '4' ? 'text-purple-500 bg-purple-200' : 'text-black'}
            `}>{num}</div>
        </div>
        <h1 className='py-5 text-xl font-semibold'>{heading}</h1>
        <p>{para}</p>
    </div>
  )
}

export default Firstcard