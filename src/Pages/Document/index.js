import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import Notch from '../../Components/Notch'
import { Link, useHistory, useParams } from 'react-router-dom'
import api from '../../Services/api'
import { AiTwotonePlusCircle } from 'react-icons/ai'
import { TiArrowLeftOutline } from 'react-icons/ti'
import FormInput from '../../Components/FormInput'
import FormTextArea from '../../Components/TextArea'
import SearchCreditor from '../../Components/Creditor'
import { toConvert, dealWithData } from '../../Utils/dateFormat'
import { dealWithToken } from '../../Utils/dealWithToken'
import User from '../../Components/User'
import { RotateSpinner } from "react-spinners-kit"
import List from '../../Components/List'
import './styles.css'


const Document = () => {
  const [resReq, setResReq] = useState(false)
  const [loading, setLoading] = useState(true)
  const { register, handleSubmit, errors, formState, reset } = useForm()
  const [documents, setDocuments] = useState([])
  const [formDocument, setFormDocument] = useState(false)
  const [count, setCount] = useState(0)
  const token = localStorage.getItem('token')
  const unity = localStorage.getItem('code_unity')
  const history = useHistory()
  const { code_list } = useParams()

  useEffect(() => {
    setLoading(true)
    if (code_list===undefined) {
      api.get(`/document/${unity}`, dealWithToken(token)).then(response => {
        setTimeout(() => {
          setDocuments(response.data)
          setLoading(false)
        }, 1500)
      }).catch(() => {
        localStorage.removeItem('token')
        history.push('/')
      })
    } else {
      api.get(`/one_list/${unity}/${code_list}`, dealWithToken(token)).then(response => {
        setTimeout(() => {
          setDocuments(response.data.documents)
          setLoading(false)
        }, 1500)
      }).catch(() => {
        history.push('/')
      })
    }
  }, [token, formDocument, count, history, unity, code_list])

  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    setLoading(true)
    setResReq(false)
    await dealWithData(data).then(res => {
      api.post(`/document/${code_list}`, res, dealWithToken(token)).then(() => {
        setTimeout(() => {
          setCount(count + 1)
          setFormDocument(false)
        }, 2000)
        reset()
      }).catch(err => {
        const { data } = err.response
        setLoading(false)
        setResReq(data.error)
      })
    }).catch(err => {
      setLoading(false)
      setResReq('Erro ao enviar os dados ao servidor, (verifique o console)')
      console.log(err)
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
        
        <div className="new-documewnt">
          <div className="card-new-document" onClick={() => formDocument ? setFormDocument(false) : setFormDocument(true)}>
            <AiTwotonePlusCircle size={86} color="#2f3136" />
            <span>Novo Documento</span>
          </div>
          <List />
        </div>

        <div className="documents">


          <div className="header-list">
            <div className="content-header-list">

              <span>{code_list}</span>
              <Link to="/newdocument" >Todos os Documentos</Link>

              {code_list && 
              <div className="data-list">
                <Link to={`/extract/${code_list}`} >Editar</Link>
                <Link to={`/extract/${code_list}`} >Extrato</Link>
                <Link to={`/extract/${code_list}`} >P D F</Link>
              </div>}

            </div>
          </div>
          
          <div className="content-document">
          {documents.map(document => (
            <div className="card-document" key={document.id}>
              <h1>{document.number}</h1>
              <b>{document.creditor.reason}</b>
              <b>{document.creditor.code}</b>
              <p><span>Número</span>{document.number}</p>
              <p><span>Emissão</span>{toConvert(document.emission)}</p>
              {document.due && <p><span>Vencimento</span>{toConvert(document.due)}</p> }
              <p><span>Valor</span>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(document.value)}</p>
              <Link to={`/update/${document.id}`}></Link>

              <p><span>Descrição</span></p>
              <div className="description">
                <p>{document.description}</p>
              </div>

            </div>))}
          </div>

        </div>

        {loading && 
        <div className="loading">
          <div className="content-loading">
            <RotateSpinner size={30} color="var(--discord)" loading={loading.current} />
            <span> Carregando </span>
          </div>
        </div>}

      </div>
      { formDocument && 
      <div className="new-document">
        <div className="form-document animate__animated animate__slideInDown">
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <input name="code_unity" ref={register({ required: true })} readOnly={true} defaultValue={localStorage.getItem('code_unity')} hidden={true} />
            <input name="code_user"  ref={register({ required: true })} readOnly={true} defaultValue={localStorage.getItem('code_user')}  hidden={true} />
            
          <h3>Novo Documento</h3>
          <span>_Fatura _Nota Fiscal</span>
          { resReq && <span className="response-req" >{resReq}</span> }
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
                register={register()}
                errors={errors} />

            <button type="submit" disabled={loading} >{loading ? 'Carregando . . .':'CADASTRAR'}</button>
            <div className="close" onClick={() => formDocument && setFormDocument(false) } >Fechar</div>
          </form>
        </div>
      </div>}
    </div>
  )
}

export default Document
