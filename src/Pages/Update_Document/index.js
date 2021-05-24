import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import api from '../../Services/api'
import FormInput from '../../Components/FormInput'
import FormTextArea from '../../Components/TextArea'
import { BsBoxArrowLeft } from 'react-icons/bs'
import company from '../../Assets/company.png'
import { toConvert, dealWithData, SPMaskBehavior } from '../../Utils/dateFormat'
import { Revenue } from '../../Components/Revenue'
import $ from 'jquery'
import './styles.css'


const UpdateDocument = () => {
  const [form, setForm] = useState(true)
  const [resReq, setResReq] = useState(false)
  const [document, setDocument] = useState([])
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [resUpdate, setResUpdate] = useState(false)
  const { id } = useParams()
  const history = useHistory()
  const code_unity = localStorage.getItem('code_unity')
  const token = localStorage.getItem('token')
  const { register, handleSubmit, errors, formState } = useForm()

  useEffect(() => {
    api.post('/update_document', { 
      id, 
      code_unity 
    }, {
      headers: { 
        authorization: token 
      }
    }).then(res => {
      setDocument([res.data])
    }).catch(err => {
      const { data } = err.response
      setResReq(data.error)
      setDocument([])
    })

  }, [id, code_unity, token, form, resReq, count])

  const onSubmit = async (data) => {
    setLoading(true)
    setResUpdate(false)
    await  dealWithData(data).then(res => {
      api.post('/edit_document', res, {
        headers: { 
          authorization: token 
        }
      }).then(() => {
        setTimeout(() => {
          setLoading(false)
          setCount(count + 1)
          setResUpdate('Alterações realizdas com sucesso')
        }, 2000)
      }).catch(err => {
        const { data } = err.response
        setLoading(false)
        setResUpdate(data.error)
        console.log(err)
      })
    }).catch(err => {
      setLoading(false)
      setResUpdate('Erro ao enviar os dados ao servidor, (verifique o console)')
      console.log(err)
    })
  }

  const deleteDocument = async (id) => {
    await api.post('/delete_document', { id }, {
      headers: { 
        authorization: token 
      }
    }).then(() => {
      history.push('/newdocument')
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    $('.codigo').mask(SPMaskBehavior)
  }, [form, document])

  const { isSubmitting } = formState
  
  return (
    <div id="update" className={`${resReq ? 'dark' : ''}`} >

      {resReq && <span className="error animate__animated animate__flash animate__infinite">{resReq}</span> }

      {resReq && 
      <div className="return-login">
        <Link to="/">
          <BsBoxArrowLeft size={30} color="var(--primary)" />
        </Link>
      </div>}

      <div className="content-update-document">
        {document.map(document => (
          <div className="document" key={document.id}>
            <div className="title animate__animated animate__bounce">Documento</div>

            <div className="content-header-document">
              <img src={company} alt="Company"/>
              <div className="creditor">
                <span>
                  <b>{document.creditor.reason}</b>
                </span>
                <span>
                  <b className="codigo" >{document.creditor.code}</b>
                </span>
              </div>
            </div>
            
            <span>
              <b>Número</b> {document.number}
            </span>
            <span>
              <b>Emissão</b> {toConvert(document.emission)}
            </span>
            {document.due && <span>
              <b>Vencimento</b> {toConvert(document.due)}
            </span>}
            <span>
              <b>Valor</b> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(document.value)}
            </span>

            <div className="menu-update">
              <div className="content">
                <Link to="/newdocument"><div className="share" >Voltar</div></Link>
                <div className="share" onClick={() => form === "update" ? setForm(false) : setForm("update")}>Editar</div>
                <div className="share" onClick={() => form === "taxes"  ? setForm(false) : setForm("taxes")}>Receita</div>
              </div>
              <button type="button" onClick={() => deleteDocument(document.id)} >Excluir</button>
            </div>

          </div>
        ))}
      </div>
      
      { form==="update" && 
      <div className="content-form">
        {document.map(document => (  
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="animate__animated animate__fadeIn" key={document.id}> 

          <div className="res-update">
            {resUpdate && <span className="animate__animated animate__flash" >{resUpdate}</span> }
          </div>

          <div className="content-input">
            
            <input type="number" name="id" hidden={true} defaultValue={document.id} ref={register({ 
              required: 'Erro ao capturar Id do documento'
            })}/>

            <FormInput 
              type="number" 
              name="number"
              label="Número"
              defaultValue={document.number}
              placeholder="Número Documento"
              readOnly={isSubmitting ? true : false }
              register={register({ required: 'Número do documento é abrigatório' })}
              errors={errors} />

            <div className="content-form">
              <FormInput 
                type="text" 
                name="emission"
                label="Emissão"
                defaultValue={toConvert(document.emission)}
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
                label="Vencimento"
                defaultValue={toConvert(document.due)}
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

            </div>

            <FormInput 
              type="text" 
              name="value"
              label="Valor R$"
              defaultValue={Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(document.value)}
              readOnly={isSubmitting ? true : false }
              register={register({ required: 'Valor é abrigatório' })}
              errors={errors}
              className="money" />

            </div>  
              
            <FormTextArea 
              name="description"
              id="description"
              label="Descrição"
              defaultValue={document.description}
              readOnly={isSubmitting ? true : false }
              register={register({ required: 'Informe a descrição do material ou serviço.' })}
              errors={errors} />
          <button type="submit" disabled={loading} >{loading ? 'Carregando . . .':'ALTERAR'}</button>
        </form>
        ))}
      </div>}

      { form === "taxes" && <Revenue /> }
    </div>
  )
}

export default UpdateDocument