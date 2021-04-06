import { useEffect, useState } from 'react'
import { Controller } from  'react-hook-form'
import Select from 'react-select'

import api from '../../Services/api'
import './styles.css'
const Unity = ({ control }) => {
  const [options, setOptions] = useState([
  { 
    value: 'a457f8b2-aac6-472d-ae96-ea1110de1022', 
    label: 'Almoxarifado' 
  },
  {
    value: '8496e8c2-6cdc-4941-89f4-90e398f196f3', 
    label: 'Aprovisionamento' 
  },
  {
    value: '1dda3fff-5892-4cce-817f-0a023347d214', 
    label: 'Setor Financeiro' 
  }])
  const [state, setState] = useState(true)

  useEffect(() => {
    api.get('/allunits').then(response => {
      setOptions(response.data)
      setState(false)
    })
  }, [])

  return (
  <div id="unity">
    <Controller
      as={Select}
      isClearable
      isLoading={state}
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