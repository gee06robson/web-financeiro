import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import api from '../../Services/api'
import './styles.css'
const Notch = () => {
  const history = useHistory()
  const token = localStorage.getItem('token')

  const exit = async () => {
    await swal("Deseja sair ?", "Sua sessão será encerrada e seu token incluido em uma black list", {
      buttons: {
        cancel: "Não, Cancelar",
        catch: {
          text: "Sim, Sair",
          value: "exit",
        }
      },
      closeOnClickOutside: false,
      closeOnEsc: false,
    }).then(async (value) => {
      switch (value) {

        case "exit":
          await swal("Encerrando sua sessão", "Até logo").then(() => {
            api.post('/blacklist', "", { headers: { authorization: token } }).then(() => {
              history.push('/')
            }).catch(err => {
              const { data } = err.response
              swal("Ops!", data.error).then(() => {
                localStorage.removeItem('token')
                history.push('/')
              })
            })
          })
        break;
  
        default:
          swal("Que bom!", "Você optou por não sair")
      }
    })
  }

  return (
    <div id="notch">
      <button type="button" className="cicle" onClick={exit} ></button>
    </div>
  )
}

export default Notch