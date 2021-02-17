import Notch from '../../Components/Notch'
import { Link } from 'react-router-dom'

import './styles.css'

import DropDownMenu from '../../Components/DropDown'
const Home = () => {
  return (
    <div id="home">
      <div className="content-header-home">

      </div>

      <div className="content-body-home">
        <div className="body">
          <div className="header-body">
            <div className="link-header">
              <DropDownMenu name="Credor">
                <Link to="/newcreditor">Novo Credor</Link>
              </DropDownMenu>
              <DropDownMenu name="Documento">
                <Link to="/newdocument">Novo Documento</Link>
                <Link to="/typedocument">Tipo de Documento</Link>
              </DropDownMenu>
            </div>
            <Notch />
          </div>
          <div className="content-body">
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
