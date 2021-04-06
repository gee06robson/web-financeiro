import { Controller } from  'react-hook-form'
import Select from 'react-select'

import api from '../../Services/api'
import './styles.css'
const Unity = ({ control }) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  
  return (
  <div id="unity">
    <Controller
      as={Select}
      isClearable
      // isLoading={state}
      className='react-select-container'
      classNamePrefix="react-select"
      name="unity"
      options={options}
      control={control} 
      defaultValue="" 
      placeholder="Selecione uma Unidade"
      styles={{
        placeholder: base => ({
          ...base,
          fontSize: '1em',
          color: 'var(--gray)',
          fontWeight: 'bold',
        }),
      }} />
  </div>
  )
}

export default Unity