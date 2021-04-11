import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import jwt_decode from "jwt-decode";
import { swalErrorToken } from '../../Utils/swalAlert'

import api from '../../Services/api'

import './styles.css'
const User = () => {
  const [user, setUser] = useState([])
  const history = useHistory()
  const token = localStorage.getItem('token')

  useEffect(() => {
    api.get('/check', {
      headers: { 
        authorization: token 
      }
    }).then(response => {
      const { sub, unity } = jwt_decode(response.data.authorization)
      setUser(sub)
      unity.map(res => localStorage.setItem('code_unity', res.codeUnity))
        sub.map(res => localStorage.setItem('code_user',  res.codeUser))
    }).catch(err => {
      const { data } = err.response
      swal(swalErrorToken('Ops!', data.error)).then(() => {
        localStorage.clear()
        history.push('/')
      })
    })
  }, [token, history])

  return (
    <div id="user" className="animate__animated animate__fadeInDown">
      <p>
        <strong>USUÁRIO </strong>
        <span>{user.map(res => (`${res.name} ${res.lastName}`))}</span>
      </p>
    </div>
  )
}

export default User