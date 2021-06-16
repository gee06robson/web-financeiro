import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import api from '../../Services/api'
import FormInput from '../../Components/FormInput'
import Unity from '../../Components/Unity'
import Load from "../../Components/Load"
import './styles.css'


const Register = () => {
  const [loading, setLoading] = useState(false)
  const [resReq, setResReq] = useState('')
  const { register, handleSubmit, errors, formState, control } = useForm()
  const history = useHistory()
          localStorage.clear()

  const onSubmit = async (data) => {
    console.log(data)
    setResReq(false)
    setLoading(true)
    await api.post('/user', data).then(res => {
      setTimeout(() => {
        history.push('/')
      }, 500)
    }).catch(err => {
      const { data } = err.response
      setLoading(false)
      setResReq(data.error)
    })
  }

  const { isSubmitting } = formState;

  return (
    <div id="register">
      <div className="container">

        <div className="content">
          
          {loading && <Load state={loading} />}

          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>  
            <div className="title">
              <h3>Criar uma conta</h3>
            </div>
            <div className="sub-title">
              {resReq && <span>{resReq}</span> }
            </div>

            <Unity control={control} />

            <div className="content-input-name">
              <FormInput 
                type="text" 
                name="name"
                label="Nome"
                className="login-input"
                readOnly={isSubmitting ? true : false }
                register={register({ required: 'obrigatório' })}
                errors={errors} />

              <FormInput 
                type="text" 
                name="last_name"
                className="login-input"
                label="Sobre Nome"
                readOnly={isSubmitting ? true : false }
                register={register({ required: 'obrigatório' })}
                errors={errors} />
            </div>

            <div className="content-input">
              <FormInput 
                type="number" 
                name="code"
                className="login-input"
                label="CPF"
                readOnly={isSubmitting ? true : false }
                register={register({
                  required: 'obrigatório',
                  minLength: {
                    value: 11,
                    message: 'CPF requer 11 caracteres'
                  },
                  maxLength: {
                    value: 11,
                    message: 'CPF requer 11 caracteres'
                  } })}
                errors={errors} />
            </div>
            
            <div className="content-input">
              <FormInput 
                type="email" 
                name="email"
                className="login-input"
                label="E-mail"
                readOnly={isSubmitting ? true : false }
                register={register({ 
                  required: 'obrigatório',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "O valor inserido não corresponde ao formato de e-mail"
                  } 
                })}
                errors={errors} />
            </div>

            <div className="content-input">
              <FormInput 
                type="password" 
                className="login-input"
                name="password"
                label="Senha"
                readOnly={isSubmitting ? true : false }
                register={register({ required: 'obrigatório' })}
                errors={errors} />
            </div>

            <Link to="/">Esqueceu a senha?</Link>

            <div className="content-button">
              <button type="submit">
                <div>Continuar</div>
              </button>
            </div>

            <div className="register">
              <Link to="/">Já tem uma conta? </Link>
            </div> 
          </form>

        </div>
        
      </div>
    </div>
  )
}

export default Register