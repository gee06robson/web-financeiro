import { useState } from 'react'

import './styles.css'
const DropDownMenu = (props) => {
  const { name, children } = props
  const [DropDown ,setDropdown] = useState(false)

  return (
    <div id="dropdown" onMouseEnter={() => setDropdown(true) } onMouseLeave={() => setDropdown(false)}>
      <button type="button" >{name}</button>
      {DropDown && 
      <div className="menu-dropdown">
        { children }
      </div>}
    </div>
  )
}

export default DropDownMenu