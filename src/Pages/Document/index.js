import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import Notch from '../../Components/Notch'
import { Link } from 'react-router-dom'
import api from '../../Services/api'
import { AiTwotonePlusCircle } from "react-icons/ai";
import { TiArrowLeftOutline } from 'react-icons/ti'

import FormInput from '../../Components/FormInput'
import FormTextArea from '../../Components/TextArea'
import SearchCreditor from '../../Components/Creditor'
import User from '../../Components/User'
import { successDocument } from '../../Utils/swalAlert'


import './styles.css'
const Document = () => {
  const { register, handleSubmit, errors, formState, reset } = useForm()
  const [documents, setDocuments] = useState([])
  const [formDocument, setFormDocument] = useState(false)
  const [count, setCount] = useState(0)
  const token = localStorage.getItem('token')

  useEffect(() => {
    api.get(`/document/${localStorage.getItem('code_unity')}`, { 
      headers: { 
        authorization: token 
      }
    }).then(response => {
      setDocuments(response.data)
    }).catch(err => {
      console.log(err.response)
    })
  }, [token, formDocument, count])

  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    data.value = data.value.replace(".", "")
    data.value = data.value.replace(",", ".")
    data.reason = data.reason.toUpperCase()

    await api.post('/document', data, {
      headers: { 
        authorization: token 
      }
    }).then(() => {
      setCount(count + 1)
      swal(successDocument('Sucesso', 'Documento incluido com sucesso')).then(() => {
        reset()
      })
    }).catch(err => {
      const { data } = err.response
      console.log(data.error)
    })
  }

  return (
    <div id="document">
      <div className="header-document">
        <Link to="/home">
          <TiArrowLeftOutline size={30} color="#2f3136" />
        </Link>
          <User />
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
        <div className="form-document animate__animated animate__slideInDown">
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <input name="code_unity" ref={register({ required: true })} readOnly={true} defaultValue={localStorage.getItem('code_unity')} hidden={true} />
            <input name="code_user"  ref={register({ required: true })} readOnly={true} defaultValue={localStorage.getItem('code_user')}  hidden={true} />
            
          <h3>Novo Documento</h3>
          <span>_Fatura _Nota Fiscal</span>
            <SearchCreditor register={register} errors={errors} />
            <div className="content-input">
              <FormInput 
                type="number" 
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

            </div>  
              
              <FormTextArea 
                name="description"
                id="description"
                label="Descrição"
                readOnly={isSubmitting ? true : false }
                register={register({ required: 'Informe a descrição do material ou serviço.' })}
                errors={errors} />

            <button type="submit">Cadastrar</button>
            <div className="close" onClick={() => formDocument && setFormDocument(false) } >Fechar</div>
          </form>
        </div>
      </div>
      }
    </div>
  )
}

export default Document
