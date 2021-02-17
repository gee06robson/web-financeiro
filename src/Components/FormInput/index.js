import { ErrorMessage } from '@hookform/error-message'

import './styles.css'
const FormInput = ({register, errors, label, id, name, type, ...inputProps}) => {

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