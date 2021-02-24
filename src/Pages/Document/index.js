import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import Notch from '../../Components/Notch'
import { Link, useHistory } from 'react-router-dom'
import api from '../../Services/api'
import { swalErrorToken } from '../../Utils/swalAlert'
import { AiTwotonePlusCircle } from "react-icons/ai";
import { TiArrowLeftOutline } from 'react-icons/ti'

import FormInput from '../../Components/FormInput'


import './styles.css'
const Document = () => {
  const { register, handleSubmit, errors, formState } = useForm()
  const [documents, setDocuments] = useState([])
  const [formDocument, setFormDocument] = useState(false)
  const history = useHistory()
  const token = localStorage.getItem('token')
  
  useEffect(() => {
    api.get('/check', { headers: { authorization: token } }).then(response => {
      console.log('Connected')
    }).catch(err => {
      const { data } = err.response
      console.log(data.error)
      swal(swalErrorToken('Ops!', data.error)).then(() => {
        history.push('/')
      })
    })
  }, [token, history])


  useEffect(() => {
    api.get('/document', { headers: { authorization: token } }).then(response => {
      setDocuments(response.data)
    })
  }, [token])

  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <div id="document">
      <div className="header-document">
        <Link to="/home">
          <TiArrowLeftOutline size={30} color="#2f3136" />
        </Link>
        <Notch />
      </div>
      <div className="content-table-document">

      <div className="card-new-document" onClick={() => formDocument ? setFormDocument(false) : setFormDocument(true)}>
        <AiTwotonePlusCircle size={86} color="#2f3136" />
        <span>Novo Documento</span>
      </div>
        {documents.map(document => (
          <div className="card-document" key={document.id}>
            <h1>{document.number}</h1>
            <b>{document.creditor.reason}</b>
            <b>{document.creditor.code}</b>
            <p><span>Número</span>{document.number}</p>
            <p><span>Emissão</span>{document.emission}</p>
            {document.due && <p><span>Vencimento</span>{document.due}</p> }
            <p><span>Valor</span>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(document.value)}</p>
          </div>
        ))}
    
      </div>

      { formDocument && 
      <div className="new-document">
        <div className="form-document">
        <h3>Novo Documento</h3>
        <span>_Fatura _Nota Fiscal</span>
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <FormInput 
              type="text" 
              name="number"
              placeholder="Número Documento"
              readOnly={isSubmitting ? true : false }
              register={register({ required: 'Número do documento é abrigatório' })}
              errors={errors} />

            <FormInput 
              type="text" 
              name="emission"
              readOnly={isSubmitting ? true : false }
              register={register({ 
                required: 'Emissão abrigatória',
                minLength: {
                  value: 10,
                  message: 'Emissão requer 10 caracteres'
                },
                maxLength: {
                  value: 10,
                  message: 'Emissão requer 10 caracteres'
                }
              })}
              errors={errors}
              className="emission" />
            
            <FormInput 
              type="text" 
              name="due"
              readOnly={isSubmitting ? true : false }
              register={register({ 
                minLength: {
                  value: 10,
                  message: 'Vencimento requer 10 caracteres'
                },
                maxLength: {
                  value: 10,
                  message: 'Vencimento requer 10 caracteres'
                }
              })}
              errors={errors}
              className="due" />

            <FormInput 
              type="text" 
              name="value"
              readOnly={isSubmitting ? true : false }
              register={register({ required: 'Valor é abrigatório' })}
              errors={errors}
              className="money" />


            <button type="submit">Cadastrar</button>
          </form>
          <div className="close" onClick={() => formDocument && setFormDocument(false) } >Fechar</div>
        </div>
      </div>
      }
    </div>
  )
}

export default Document
