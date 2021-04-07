import { useEffect, useState } from 'react'
import { Controller } from  'react-hook-form'
import Select from 'react-select'

import api from '../../Services/api'
import './styles.css'
const Unity = ({ control }) => {
  const [options, setOptions] = useState([{ value: '', label: '' }])
  const [state, setState] = useState(true)

  useEffect(() => {
    api.get('/allunits').then(response => {
      setOptions(response.data)
      setState(false)
    })
  }, [])

  console.log(options)
  return (
  <div id="unity">
    <Controller
      as={Select}
      isClearable
      isLoading={state}
      className='react-select-container'
      classNamePrefix="react-select"
      name="unity"
      options={options.map(res => ({ value: res.code_unity, label: res.unity }))}
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