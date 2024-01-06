import React from 'react'
import './SidebarOption.css'

function SidebarOption( {title , Icon, onClick , uri} ) {
  return (


    <div className='sidebar_option' onClick={onClick} uri={uri}>
      {Icon && <Icon className='sidebar_option_icon'  /> }
      {Icon ? <h4> {title} </h4> : <p uri={uri} > {title} </p>}

    </div>


  )
}

export default SidebarOption