import React from 'react'

const ThirdCard = ({svg, heading, heading2, para}) => {
  return (
    <div className='border border-zinc-300 h-55 md:w-90 w-110 rounded-xl p-6 shadow-md text-center'>
        <div className='rounded-full text-2xl font-bold flex justify-center items-center'>{svg}</div>
        <h1 className='py-5 font-semibold'>{heading}</h1>
        <h2 className='text-2xl font-bold'>{heading2}</h2>
        <p>{para}</p>
    </div>
  );
};

export default ThirdCard