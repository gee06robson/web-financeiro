import { useHistory } from 'react-router-dom'
import api from '../../Services/api'
import './styles.css'
const Notch = () => {
  const history = useHistory()
  const token = localStorage.getItem('token')

  const exit = async () => {
    await api.post('/blacklist', "", { 
      headers: { 
        authorization: token 
      } 
    }).then(() => {
      localStorage.clear()
      history.push('/')
    }).catch(err => {
      // const { data } = err.response
      localStorage.removeItem('token')
      history.push('/')
    })
  }

  return (
    <div id="notch">
      <button type="button" className="cicle" onClick={exit} ></button>
    </div>
  )
}

export default Notch