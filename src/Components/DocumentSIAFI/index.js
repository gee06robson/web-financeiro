import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormInput from '../../Components/FormInput'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import logo from '../../Assets/logo_siafi.png'
import api from '../../Services/api'
import { dealWithToken } from '../../Utils/dealWithToken'
import './styles.css'

const DocumentSIAFI = ({ document_id, setUpdateList, updateList}) => {
  const [document, setDocument] = useState([])
  const { register, handleSubmit, errors, formState } = useForm()
  const token = localStorage.getItem('token')
  const code_unity = localStorage.getItem('code_unity')

  useEffect(() => {
    api.post('/update_document', {
      code_unity, 
      id: document_id
    }, dealWithToken(token)).then(response => {
      setDocument(response.data.documents_SIAFI)
    }).catch(err => {
      console.log(err)
    })
  }, [document_id, code_unity, token, updateList])
  
  const onSubmit = async (data) => {
    data.document = data.document.toUpperCase()
    await api.post('/new_document_siafi', data, dealWithToken(token)).then(() => {
      setUpdateList(Math.floor(Math.random() * 10))
    }).catch(err => {
      console.log(err)
    })
  }

  const removeDocument = async (data) => {
    console.log(data)
    await api.post('/remove_document_siafi', data, dealWithToken(token)).then(() => {
      setUpdateList(Math.floor(Math.random() * 10))
    }).catch(err => {
      console.log(err)
    })
  }
  const { isSubmitting } = formState;

  return (
    <div id="documentSIAFI">
      <div className="content-logo">
        <img src={logo} alt="SIAFI" />
      </div>
      <div className="content-document-siafi">

        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="content-infor">
            <p>Todos os documentos gerados no SIAFI são aceitos (NE, NS, OB, ETC..)</p>
          </div>
          <div className="container-input">            
            <FormInput 
              type="number" 
              name="year"
              placeholder="Ano"
              readOnly={isSubmitting ? true : false }
              register={register({ 
                required: true,
                maxLength: {
                  value: 4,
                },
                minLength: {
                  value: 4,
                }
              })}
              errors={errors} />

            <FormInput 
              type="text" 
              name="document"
              placeholder="Doc"
              readOnly={isSubmitting ? true : false }
              register={register({ 
                required: true,
                maxLength: {
                  value: 2,
                },
                minLength: {
                  value: 2,
                }
              })}
              errors={errors} />
            
            <FormInput 
              type="number" 
              name="number"
              placeholder="Número"
              readOnly={isSubmitting ? true : false }
              register={register({ 
                required: true,
                maxLength: {
                  value: 6,
                },
                minLength: {
                  value: 6,
                }
              })}
              errors={errors} />
            
            <input 
              type="number" 
              name="document_id"
              ref={register({ required: true })}
              defaultValue={document_id}
              hidden={true} />
          </div>
            
          <div className="content-button">              
            <button type="submit">
              <div>OK</div>
            </button>
          </div>

        </form>

        <div className="tag-documentSIAFI">
          {document.map(response => (
            <div className="content" key={response.id} >
              <span>{response.year}{response.document}{response.number}</span>
              <AiOutlineCloseCircle color="var(--discord)" onClick={() => removeDocument({ 
                id_DocumentSIAFI: response.id, 
                document_id 
              })} />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default DocumentSIAFI