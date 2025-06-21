import React from 'react'

const SecondCard = ({svg, heading, para}) => {
  return (
    <div className='border border-zinc-300 h-55 md:w-90 w-110 rounded-xl p-5'>
        <div className='size-15 rounded-full text-2xl font-bold flex justify-center items-center'>{svg}</div>
        <h1 className='py-3 font-semibold'>{heading}</h1>
        <p>{para}</p>
    </div>
  );
};

export default SecondCard