import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import Notch from '../../Components/Notch'
import { Link, useHistory, useParams } from 'react-router-dom'
import api from '../../Services/api'
import { AiTwotonePlusCircle, AiOutlineFullscreenExit } from 'react-icons/ai'
import { TiArrowLeftOutline } from 'react-icons/ti'
import FormInput from '../../Components/FormInput'
import FormTextArea from '../../Components/TextArea'
import SearchCreditor from '../../Components/Creditor'
import { toConvert, dealWithData, currencyFormat, SPMaskBehavior} from '../../Utils/dateFormat'
import { dealWithToken } from '../../Utils/dealWithToken'
import { Report } from '../../Utils/pdf'
import User from '../../Components/User'
import { RotateSpinner } from "react-spinners-kit"
import List from '../../Components/List'
import ListDocuments from '../../Components/ListDocuments'
import SettingsList from '../../Components/Update_List'
import DocumentSIAFI from '../../Components/DocumentSIAFI'
import RemoveDocument from '../../Components/RemoveDocument'
import $ from 'jquery'
import './styles.css'


const Document = () => {
  const [resReq, setResReq] = useState(false)
  const [update, setUpdate] = useState(false)
  const [loading, setLoading] = useState(true)
  const { register, handleSubmit, errors, formState, reset } = useForm()
  const [documents, setDocuments] = useState([])
  const [formDocument, setFormDocument] = useState(false)
  const [clickDocumentSIAFI, setClickDocumentSIAFI] = useState(false)
  const [count, setCount] = useState(0)
  const token = localStorage.getItem('token')
  const unity = localStorage.getItem('code_unity')
  const [updateList, setUpdateList] = useState(0)
  const history = useHistory()
  const { code_list } = useParams()
 
  useEffect(() => {
    setLoading(true)
    if (code_list===undefined) {
      api.get(`/document/${unity}`, dealWithToken(token)).then(response => {
        setTimeout(() => {
          setDocuments(response.data)
          setLoading(false)
          $('.code').mask(SPMaskBehavior)
        }, 500)
      }).catch(() => {
        localStorage.removeItem('token')
        history.push('/')
      })
    } else {
      api.get(`/one_list/${unity}/${code_list}`, dealWithToken(token)).then(response => {
        setTimeout(() => {
          setDocuments(response.data.documents)
          setLoading(false)
          $('.code').mask(SPMaskBehavior)
        }, 500)
      }).catch(() => {
        history.push('/')
      })
    }
  }, [token, formDocument, count, history, unity, code_list, updateList])

  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    setLoading(true)
    setResReq(false)
    await dealWithData(data).then(res => {
      api.post(`/document/${code_list}`, res, dealWithToken(token)).then(() => {
        setTimeout(() => {
          setCount(count + 1)
          setFormDocument(false)
          setUpdateList(count + Math.floor(Math.random() * 10))
        }, 200)
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
          {code_list ? 
          <ListDocuments setUpdateList={setUpdateList} updateList={updateList} /> :
          <List setUpdateList={setUpdateList} updateList={updateList} />}
        </div>

        <div className="documents">
          
          <div className="header-list">
            <div className="content-header-list">

              <Link to="/newdocument">
                {code_list && <TiArrowLeftOutline size={28} color="var(--focus-primary)" /> }
              </Link>
              <span>{code_list}</span>

              {code_list && 
              <div className="data-list">
                <span onClick={() => setUpdate(true)} >Editar</span>
                <Link to={`/extract/${code_list}`} target="_blank" >Extrato</Link>
                <span onClick={() => Report(code_list)} className="pdf" >P D F</span>
              </div>}

            </div>
          </div>
          
          <div className="content-document">
          {documents.map(document => (
            <div className="card-document" key={document.id}>
              <div className="content-number">
                <h1>{document.number}</h1>
              </div>

              <div className="content-data-document">

                <div className="content-creditor">
                  <span>{document.creditor.reason}</span>
                  <span className="code">{document.creditor.code}</span>
                </div>

                <div className="row">
                  <span>Número</span>
                  {document.number}
                </div>

                <div className="row">
                  <span>Emissão</span>
                  {toConvert(document.emission)}
                </div>

                {document.due && 
                <div className="row">
                  <span>Vencimento</span>
                  {toConvert(document.due)}
                </div>}

                <div className="row">
                  <span>Valor</span>
                  {currencyFormat(document.value)}
                </div>

              </div>

              <div className="content-description">
                <span>Descrição</span>
                <div className="description">
                  <p>{document.description}</p>
                </div>
              </div>

              <div className="cicle-document">
                <Link to={`/update/${document.id}`}></Link>
              </div>

              <div className="cicle-plus">
              {clickDocumentSIAFI ? 
                <AiOutlineFullscreenExit size={23} onClick={() => clickDocumentSIAFI ? setClickDocumentSIAFI(false) : setClickDocumentSIAFI(true)} /> :
                <AiTwotonePlusCircle size={23} onClick={() => clickDocumentSIAFI ? setClickDocumentSIAFI(false) : setClickDocumentSIAFI(true)} />
              }
              </div>

              {code_list && 
              <RemoveDocument 
                code_list={code_list} 
                id_document={document.id} 
                setUpdateList={setUpdateList} />
              }

              {clickDocumentSIAFI &&
              <DocumentSIAFI 
                document_id={document.id} 
                setUpdateList={setUpdateList}
                updateList={updateList} />
              }

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
      { update &&
        <SettingsList code_list={code_list} setUpdateList={setUpdateList} >
          <button type="button" onClick={() => update ? setUpdate(false) : setUpdate(true)} >
            <div>SAIR</div>
          </button>
        </SettingsList>
      }
    </div>
  )
}

export default Document
