import { useEffect, useState } from 'react'
import { Controller } from  'react-hook-form'
import Select from 'react-select'

import api from '../../Services/api'
import './styles.css'
const Unity = ({ control }) => {
  const [options, setOptions] = useState([])
  const [state, setState] = useState(true)

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected ? 'var(--border-hover)' : 'var(--sistem)',
      borderRadius: 2,
      cursor: 'pointer',
      textTransform: 'uppercase',
      fontWeight: '600',
      color: state.isSelected ? 'var(--primary)' : 'var(--senary)',
    }),

    menuList: (provided, state) => ({
      ...provided,
      background: 'var(--tertiary)',
      borderRadius: 4,
      border: '1px solid var(--white)',
      padding: 2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 2,
    }),

    container: (provided) => ({
      ...provided,
      width: '100%',
    }),

    control: (provided, state) => ({
      ...provided,
      background: 'var(--primary)',
      cursor: 'pointer',
      border: '1px solid rgba(0, 0, 0, .3)'
    }),

    singleValue: (provided) => ({
      ...provided,
      color: 'var(--discord)',
      textTransform: 'uppercase',
    })
  }

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
      name="unity"
      styles={customStyles}
      options={options.map(res => ({ 
        value: res.code_unity, 
        label: res.unity 
      }))}
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: 'rgba(0, 0, 0, .3)',
        },
      })}
      control={control} 
      defaultValue={{ 
        value: "b15fb1d2-e4b6-4407-845c-5f01aba0ffda", 
        label: "Selecione uma Unidade" 
      }}
      placeholder="Selecione uma Unidade"
      />
  </div>
  )
}

export default Unity