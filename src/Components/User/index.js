import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import jwt_decode from "jwt-decode"
import api from "../../Services/api"
import { ClassicSpinner } from "react-spinners-kit"
import "./styles.css"


const User = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState([])
  const [unity, setUnity] = useState([])
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
      setUnity(unity)
    }).catch(err => {
      const { data } = err.response
      console.log(data.error)
    })
  }, [token, history])

  useEffect(() => {
    unity.map(res => localStorage.setItem('code_unity', res.codeUnity))
    user.map(res => localStorage.setItem('code_user',  res.codeUser))
  }, [unity, user])

  return (
    <div id="user" className="animate__animated animate__fadeInDown">
      {loading ? <ClassicSpinner size={22} color="#000000" loading={loading} /> :
      <p>
        <strong>{user.map(res => (`${res.name} ${res.lastName}`))}</strong>
        <span>{unity.map(res => (`${res.unity}`))}</span>
      </p>}
    </div>
  )
}

export default User