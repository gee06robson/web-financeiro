import { useEffect, useState } from 'react'
import { Controller } from  'react-hook-form'
import Select from 'react-select'

import api from '../../Services/api'
import './styles.css'
const Unity = ({ control }) => {
  const [options, setOptions] = useState([])
  const [state, setState] = useState(true)

  useEffect(() => {
    api.get('/allunits').then(response => {
      setOptions(response.data)
      setState(false)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
  <div id="unity">
    <Controller
      as={Select}
      isLoading={state}
      className='react-select-container'
      classNamePrefix="react-select"
      name="unity"
      options={options.map(res => ({ 
        value: res.code_unity, 
        label: res.unity 
      }))}
      control={control} 
      defaultValue={{ 
        value: "b15fb1d2-e4b6-4407-845c-5f01aba0ffda", 
        label: "Selecione uma Unidade" 
      }}
      placeholder="Selecione uma Unidade"
      styles={{
        placeholder: base => ({
          ...base,
          fontSize: '1em',
          color: 'var(--text)',
        }),
      }} />
  </div>
  )
}

export default Unity