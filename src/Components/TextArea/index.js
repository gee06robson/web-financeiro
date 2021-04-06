import 'jquery-mask-plugin/dist/jquery.mask.min'
import { ErrorMessage } from '@hookform/error-message'

import './styles.css'
const FormTextArea = ({register, errors, label, id, name, ...inputProps}) => {
  return (
    <div id="formTextArea" >
      <label htmlFor={id}>{label}</label>
      <textarea
        rows="4" cols="50"
        ref={register}
        id={id}
        name={name}
        {...inputProps}
      ></textarea>
      <ErrorMessage errors={errors} name={name} as="span" />
    </div>
  )
}

export default  FormTextArea