import React from 'react'
import './SidebarOption.css'

function SidebarOption( {title , Icon, onClick} ) {
  return (


    <div className='sidebar_option' onClick={onClick}>
      {Icon && <Icon className='sidebar_option_icon'  /> }
      {Icon ? <h4> {title} </h4> : <p> {title} </p>}

    </div>


  )
}

export default SidebarOption