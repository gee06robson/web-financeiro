import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import api from '../../Services/api'

import FormInput from '../../Components/FormInput'
import { progressLogin, errorLogin } from '../../Utils/toastify'

import logo from '../../Assets/fundo.canto.png'
import logoInicio from '../../Assets/new-logo.png'
import Unity from '../../Components/Unity'
import './styles.css'
import 'react-toastify/dist/ReactToastify.css';
const Auth = () => {
  const toastId = useRef(null);
  const { register, handleSubmit, errors, formState, control } = useForm()
  const history = useHistory()
          localStorage.clear()

  const onSubmit = async (data) => {

    await api.post('/login', data, {
      onUploadProgress: p => {
        let progress = Math.round((p.loaded * 100) / p.total)

        if(toastId.current === null){
          toastId.current = toast.dark('Efetuando login', progressLogin(progress))
        } else {
          toast.update(toastId.current, progressLogin(progress))
        }
      }
    }).then(res => {
      toast.done(toastId.current);
      localStorage.setItem('token', res.data.token)
      history.push('/home')
    }).catch(err => {
      const { data } = err.response
      toast.dismiss(toastId.current)
      toast.error(data.error, errorLogin())
    })
  }

  const { isSubmitting } = formState;

  return (
    <div id="auth">
      <div className="container">

        <div className="content">
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>  
            <div className="title">Olá, seja bem vindo!</div>
            <div className="sub-title">Preencha os dados abaixo para logar</div>

            <Unity control={control} />
            <FormInput 
              type="number" 
              name="code"
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
              name="password"
              placeholder="SENHA"
              readOnly={isSubmitting ? true : false }
              register={register({ required: 'Este campo é obrigatório' })}
              errors={errors} />

            <Link to="/">Esqueceu a senha?</Link>

            
            <button type="submit">Entrar</button>
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
      <div className="logo">
        <img src={logo} alt="Financeiro"/>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Auth