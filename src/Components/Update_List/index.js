import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import FormInput from '../../Components/FormInput'
import { RotateSpinner } from 'react-spinners-kit'
import FormTextArea from '../../Components/TextArea'
import { dealWithToken } from '../../Utils/dealWithToken'
import api from '../../Services/api'
import './styles.css'


const SettingsList = ({code_list, setUpdateList, children}) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [update, setUpdate] = useState(0)
  const { register, handleSubmit, errors, formState } = useForm()
  const token = localStorage.getItem('token')
  const unity = localStorage.getItem('code_unity')
  
  const onSubmit = async (data) => {
    setList([])
    setLoading(true)
    await api.post(`/update_list/${unity}/${code_list}`, data, dealWithToken(token)).then(() => {
      setTimeout(() => {
        setUpdate(update + Math.floor(Math.random() * 10))
        setUpdateList(update + Math.floor(Math.random() * 10))
      }, 500)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    api.get(`/list_reduced/${unity}/${code_list}`, dealWithToken(token)).then(response => {
      setTimeout(() => {
        setLoading(false)
        setList([response.data])
        console.log(response.data)
      }, 500)
    }).catch(err => {
      console.log(err)
    })
  }, [token, code_list, unity, update, children])

  const { isSubmitting } = formState

  return (
    <div id="update_list">
      <div className="container-list">

        <div className="content-list">
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

          {loading && 
          <div className="content-loading">
            <RotateSpinner size={18} color="var(--discord)" />
            <span>Carregando</span>
          </div>}

          {list.map(response => (
          <div className="content-form" key={response.id} >

            <FormInput 
              type="text" 
              name="linked_to"
              placeholder="REFERÊNCIA Exemplo: DIEx nº 001-FINANCEIRO/BPEB"
              defaultValue={response.linked_to}
              readOnly={isSubmitting ? true : false }
              register={register({ required: 'preenchimento obrigatório' })}
              errors={errors} />

            <FormTextArea 
              name="title"
              id="title"
              rows="1"
              label="Título"
              defaultValue={response.title}
              readOnly={isSubmitting ? true : false }
              register={register({ required: 'preenchimento obrigatório' })}
              errors={errors} />

            <FormTextArea 
              name="description"
              id="description"
              rows="1"
              label="Descrição"
              defaultValue={response.description}
              readOnly={isSubmitting ? true : false }
              register={register({ required: 'preenchimento obrigatório' })}
              errors={errors} />

            <div className="content-list-authentication">
              <FormInput 
                type="text" 
                name="authentication"
                label="Assinador por"
                placeholder="Exemplo: FILIPE DE MENEZES CAVALCANTI - 1º TEN"
                defaultValue={response.authentication}
                readOnly={isSubmitting ? true : false }
                register={register({ required: 'obrigatório' })}
                errors={errors} />
              
              <FormInput 
                type="text" 
                name="occupation"
                label="Ocupação"
                placeholder="Exemplo: ENCARREGADO DO SETOR FINANCEIRO"
                defaultValue={response.occupation}
                readOnly={isSubmitting ? true : false }
                register={register({ required: 'obrigatório' })}
                errors={errors} />
            </div>

          </div>
          ))}
            
          <div className="content-button">
            <button type="submit">
              <div>ALTERAR</div>
            </button>

            {children} 
          </div>
          
          </form>
        </div>

        <div className="content-header">
          <span>Editar</span>
        </div>

      </div>
    </div>
  )
}

export default SettingsList