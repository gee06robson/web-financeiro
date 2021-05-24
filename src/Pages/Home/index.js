import Notch from '../../Components/Notch'
import { Link } from 'react-router-dom'
import { AiTwotonePlusCircle } from "react-icons/ai";
import User from '../../Components/User'
import DropDownMenu from '../../Components/DropDown'
import './styles.css'


const Home = () => {

  return (
    <div id="home">
      <div className="content-header-home" >
        <User />
      </div>

      <div className="content-body-home">

        <div className="body">
          <div className="header-body">

            <div className="link-header">
              <DropDownMenu name="Credor">
                <Link to="/newcreditor">
                  <AiTwotonePlusCircle size={26} color="#F0F0F5" />
                  <span>Novo Credor</span>
                </Link>
              </DropDownMenu>
              <DropDownMenu name="Documento">
                <Link to="/newdocument" >
                  <AiTwotonePlusCircle size={26} color="#F0F0F5" />
                  <span>Novo Documento</span>
                </Link>
              </DropDownMenu>
            </div>

            <Notch />
          </div>
        </div>

        <div className="content-sub-header animate__animated animate__fadeInDown">
          <Link to="newdocument">Novo Documento</Link>
        </div>

      </div>
    </div>
  )
}

export default Home
