import React from 'react'

function Container({children}) {
  return (
    <div className='max-w-[1920px] mx-auto'>{children}</div>
  )
}

export default Container