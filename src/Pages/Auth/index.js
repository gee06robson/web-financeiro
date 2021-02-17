import swal from 'sweetalert'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import api from '../../Services/api'

import FormInput from '../../Components/FormInput'
import { swalLogin, swalErrorLogin, swalSuccessLogin } from '../../Utils/swalAlert'

import logo from '../../Assets/logo.svg'
import './styles.css'
const Auth = () => {
  const { register, handleSubmit, errors, formState, reset } = useForm()
  const history = useHistory()

  const onSubmit = async (data) => {
   await swal(swalLogin('Aguarde . . .', 'Efetuando login . . .')).then(() => {
      api.post('/login', data).then(response => {
        swal(swalSuccessLogin('Login aprovado', 'Token de acesso gerado com sucesso')).then(() => {
          localStorage.setItem('token', response.data.token)
          history.push('/home')
        })
      }).catch(() => {
        swal(swalErrorLogin('Ops!', 'Erro ao efetuar login')).then(() => {
          reset()
        })
      })
    })
  }

  const { isSubmitting } = formState;

  return (
    <div id="auth">
      <div className="container">
        <div className="content">
          <h1>F I N A N C E I R O</h1>
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <FormInput 
              type="number" 
              name="code"
              placeholder="CPF"
              readOnly={isSubmitting ? true : false }
              register={register({
                required: 'Código abrigatório',
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
              name="password"
              placeholder="Senha"
              readOnly={isSubmitting ? true : false }
              register={register({ required: 'Senha é obrigatória' })}
              errors={errors} />
            
            <button type="submit">Entrar</button>
          </form>
          <Link to="/">Esqueceu a senha?</Link>
          <Link to="/">Cadastre-se</Link>
        </div>

        <div className="content-logo">
          <img src={logo} alt="Financeiro"/>
          <p>Batalhão de Polícia do Exército de Brasília</p>
          <span>Sistema de Apoio Administrativo</span>
        </div>
      </div>
      <h4>By @Financeiro / robson</h4>
    </div>
  )
}

export default Auth