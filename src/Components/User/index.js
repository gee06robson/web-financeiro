import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import jwt_decode from "jwt-decode"
import api from "../../Services/api"
import { ClassicSpinner } from "react-spinners-kit"
import "./styles.css"


const User = () => {
  const [loading, setLoading] = useState(true)
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
      setLoading(false)
      setUser(sub)
      unity.map(res => localStorage.setItem('code_unity', res.codeUnity))
        sub.map(res => localStorage.setItem('code_user',  res.codeUser))
    }).catch(err => {
      const { data } = err.response
      console.log(data.error)
    })
  }, [token, history])

  return (
    <div id="user" className="animate__animated animate__fadeInDown">
      {loading ? <ClassicSpinner size={22} color="#000000" loading={loading} /> :
      <p>
        <strong>USUÁRIO </strong>
        <span>{user.map(res => (`${res.name} ${res.lastName}`))}</span>
      </p>}
    </div>
  )
}

export default User