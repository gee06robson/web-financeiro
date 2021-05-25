import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import api from '../../Services/api'
import FormInput from '../../Components/FormInput'
import logoInicio from '../../Assets/new-logo.png'
import Unity from '../../Components/Unity'
import Load from "../../Components/Load"
import './styles.css'


const Auth = () => {
  const [loading, setLoading] = useState(false)
  const [resReq, setResReq] = useState('')
  const { register, handleSubmit, errors, formState, control } = useForm()
  const history = useHistory()
          localStorage.clear()

  const onSubmit = async (data) => {
    setResReq(false)
    setLoading(true)
    await api.post('/login', data).then(res => {
      setTimeout(() => {
        setLoading(false)
        localStorage.setItem('token', res.data.token)
        history.push('/home')
      },1500)
    }).catch(err => {
      const { data } = err.response
      setLoading(false)
      setResReq( data.error)
    })
  }

  const { isSubmitting } = formState;

  return (
    <div id="auth">
      <div className="container">

        <div className="content">
          
          {loading && <Load state={loading} />}

          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>  
            <div className="title">Boas-vindas de volta!</div>
            <div className="sub-title">
              {resReq ? <span>{resReq}</span> : 'Estamos muito animados em te ver novamente!'}
            </div>

            <Unity control={control} />
            <FormInput 
              type="number" 
              name="code"
              className="login-input"
              placeholder="CPF OU E-MAIL"
              readOnly={isSubmitting ? true : false }
              register={register({
                required: 'Este campo é obrigatório',
                minLength: {
                  value: 11,
                  message: 'Código requer 11 caracteres'
                },
                maxLength: {
                  value: 11,
                  message: 'Código requer 11 caracteres'
                } })}
              errors={errors} />

            <FormInput 
              type="password" 
              className="login-input"
              name="password"
              placeholder="SENHA"
              readOnly={isSubmitting ? true : false }
              register={register({ required: 'Este campo é obrigatório' })}
              errors={errors} />

            <Link to="/">Esqueceu a senha?</Link>

            
            <button type="submit">
              <div>Entrar</div>
            </button>
            <div className="register">
              <span>Precisando de uma conta? </span>
              <Link to="/">Cadastre-se</Link>
            </div> 
          </form>

          <div className="content-logo">
            <img src={logoInicio} alt="Financeiro"/>
            <div className="sub-title">Batalhão de Polícia do Exército de Brasília</div>
            <div className="sub-title">Sistema de Apoio Administrativo</div>
          </div>

        </div>
        
      </div>
    </div>
  )
}

export default Auth