import { useState } from 'react'
import api from '../../Services/api'
import FormInput from  '../FormInput'

import './styles.css'
const SearchCreditor = ({register, errors}) => {
  const [razao, setRazao] = useState('')
  const [show, setShow] = useState(false)
  const token = localStorage.getItem('token')

  const blurCredor = async (e) => {
    e.preventDefault()
    await api.post('/one_creditor', {code: e.target.value}, {headers: { authorization: token }}).then(response =>  {
      setRazao(response.data.reason)
      setShow(false)
    }).catch(error => {
      const { data } = error.response
      console.log(data.error)
      setRazao('')
      setShow(true)
    })
  }

  return (
    <div id="creditor">

      <FormInput 
        type="number"
        name="code"
        placeholder="Codigo Credo"
        register={register({ 
          required: "O código é obrigatório",
          maxLength: {
            value: 14,
            message: "suporte a no máximo 14 caracteres"
          },
          minLength: {
            value: 6,
            message: "No minimo 6 caracteres (exp: 160060)."
          }})}
        errors={errors}
        onBlur={blurCredor}
        onChange={() => setRazao('')} />

      { show ? 
        <FormInput 
          type="text"
          name="reason"
          placeholder="Razao"
          value={razao} 
          onChange={e => setRazao(e.target.value)}
          register={register({required: "Preenchimento obrigatório"})}
          errors={errors} /> : 
          <div>
            <p>{razao}</p> 
            <FormInput 
              type="text"
              name="reason"
              defaultValue={razao}
              hidden={true}
              register={register({required: "Preenchimento obrigatório"})}
              errors={errors} />
          </div>
      }

    </div>
  )
}

export default SearchCreditor