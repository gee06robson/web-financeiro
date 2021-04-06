import Notch from '../../Components/Notch'
import { Link } from 'react-router-dom'
import { FcDoNotMix } from "react-icons/fc"
import User from '../../Components/User'
import './styles.css'

import DropDownMenu from '../../Components/DropDown'
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
                <Link to="/newcreditor">Novo Credor</Link>
              </DropDownMenu>
              <DropDownMenu name="Documento">
                <Link to="/newdocument">Novo Documento</Link>
                <Link to="/typedocument">Tipo de Documento</Link>
              </DropDownMenu>
            </div>

            <Notch />
          </div>
        </div>

        <div className="content-card">
          <div className="card">
            <FcDoNotMix size={72} />
            <h3>DOCUMENTO DUPLICADO</h3>

            <p>Uma das principais funções deste sistema é evitar a duplicidade no envio de documentos ao setor financeiro, 
              tendo em vista que é possivel executar uma mesma despesa mais de uma vez, dependendo da modalidade em que foi 
              criada a nota de empenho.</p>

            <p>Você pode incluir novos documentos clicando no menu acima ou clicando <Link to="newdocument">aqui.</Link></p>

            <p><strong>Atenção</strong> E essecial que ao preencher os dados no sistema voçê verifique com atenção as informações que estão sendo inseridas,  
            para que seja alcançado o objetico descrito acima.</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home
