import { useEffect } from 'react'
import $ from 'jquery'
import 'jquery-mask-plugin/dist/jquery.mask.min'
import { ErrorMessage } from '@hookform/error-message'

import './styles.css'
const FormInput = ({register, errors, label, id, name, type, ...inputProps}) => {

  useEffect(() => {
    $('.money').mask("#.##0,00", { reverse: true, placeholder: '0,00' })
    $('.emission').mask("00/00/0000", { placeholder: 'Emissão'})
    $('.due').mask("00/00/0000", { placeholder: 'Vencimento'})
    $('.empenho').mask("0000NE000000", { placeholder: '____NE______'})
  })

  return (
    <div id="formInput" >
      <label htmlFor={id}>{label}</label>
      <input
        ref={register}
        id={id}
        name={name}
        type={type}
        {...inputProps}
      />
      <ErrorMessage errors={errors} name={name} as="span" />
    </div>
  )
}

export default  FormInput