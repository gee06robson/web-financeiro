import swal from 'sweetalert'
import { useEffect } from 'react'
import Notch from '../../Components/Notch'
import { Link, useHistory } from 'react-router-dom'
import api from '../../Services/api'
import { swalErrorToken } from '../../Utils/swalAlert'


import './styles.css'
const Document = () => {
  const history = useHistory()
  const token = localStorage.getItem('token')
  
  useEffect(() => {
    api.get('/check', { headers: { authorization: token } }).then(response => {
      console.log('Connected')
    }).catch(err => {
      const { data } = err.response
      console.log(data.error)
      swal(swalErrorToken('Ops!', data.error)).then(() => {
        history.push('/')
      })
    })
  }, [token, history])
  
  return (
    <div id="document">
      <div className="content-header-document">

      </div>

      <div className="content-body-document">
        <div className="body">
          <div className="header-body">
            <div className="link-header">
              <Link to="/home">Voltar</Link>
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

export default Document
