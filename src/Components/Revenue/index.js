import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import FormInput from '../../Components/FormInput'
import { useParams } from 'react-router-dom'
import { handleRetention } from '../../Utils/dateFormat'
import { dealWithToken } from '../../Utils/dealWithToken'
import { RotateSpinner } from 'react-spinners-kit'
import api from '../../Services/api'
import $ from 'jquery'
import 'jquery-mask-plugin/dist/jquery.mask.min'
import './styles.css'

export const Revenue = () => {
  const { register, handleSubmit, errors, formState, reset } = useForm()
  const { id } = useParams()
  const [document, setDocument] = useState([])
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)
  const code_unity = localStorage.getItem('code_unity')
  const token = localStorage.getItem('token')
  const { isSubmitting } = formState

  useEffect(() => {
    api.post('/update_document', { 
      id, 
      code_unity 
    }, dealWithToken(token)).then(res => {
      setTimeout(() => {
        setLoading(false)
        setDocument([res.data])
        $('.money').unmask()
      }, 1500)
    }).catch(err => {
      const { data } = err.response
      console.log(data.error)
      setLoading(false)
      setDocument([])
    })
  }, [id, code_unity, token, count, reset])

  const onSubmit = async (data) => {

    setLoading(true)

    await handleRetention(data).then(data => {
      api.post('/apply_tax', data, dealWithToken(token)).then(() => {
        reset()
        setCount(count + 1)
        $('.money').unmask()
      }).catch(err => {
        console.log(err)
        setLoading(false)
      })
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })

  }

  async function removeReceita(document, retention) {

    setLoading(true)

    await api.delete(`/delete_taxes/${document}/${retention}`, dealWithToken(token)).then(() => {
      setCount(count + 1)
    })

  }

  return (
    <div id="revenue">
      <div className="content-revenue animate__animated animate__fadeIn">
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

          <div className="content-form">

            { document.map(document => (
              <input 
                key={document.id} 
                type="number" 
                hidden={true}
                defaultValue={document.id}
                name="id_document"
                ref={register({ required: 'obrigatório' })} />
            )) }

            <FormInput 
              type="number" 
              name="code"
              placeholder="Código"
              readOnly={isSubmitting ? true : false }
              register={register({ 
                required: 'obrigatório',
                maxLength: {
                  value: 4,
                  message: 'máximo 4 caracteres'
                },
                minLength: {
                  value: 4,
                  message: 'mínimo 4 caracteres'
                }
              })}
              errors={errors} />
            
            <FormInput 
              type="text" 
              name="percentage"
              readOnly={isSubmitting ? true : false }
              register={register({ 
                required: 'obrigatório',
                maxLength: {
                  value: 6,
                  message: 'máximo 6 caracteres'
                }                
              })}
              errors={errors}
              className="money" />
            
            {document.map(document => (
            <FormInput 
              key={document.id}
              type="text" 
              name="calculation"
              readOnly={isSubmitting ? true : false }
              defaultValue={document.value}
              register={register({ required: 'obrigatório' })}
              errors={errors} 
              className="money" />
            ))}

            <button type="submit">Adicionar</button>

          </div>
        </form>
        {loading && <RotateSpinner size={18} color="var(--discord)" /> }
        <div className="content-data-revenue">
          {document.map(document => (
            document.retentions.map(receita => (
            <div key={receita.id} className="retentions" >

              <span>{receita.code}</span>

              <span>{Intl.NumberFormat('pt-BR', {
                style: 'percent', 
                minimumFractionDigits: 2
              }).format(receita.percentage/100)}</span>

              <span>{Intl.NumberFormat('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              }).format(receita.taxes_documents.calculation)}</span>
              
              <span>{Intl.NumberFormat('pt-BR', {
                style: 'currency', 
                currency: 'BRL'
              }).format(((receita.percentage/100)*receita.taxes_documents.calculation))}</span>

              <span onClick={() => removeReceita(document.id, receita.id)} >Excluir</span>
            </div>
          ))))}

          <div className="content-calculation">

            <span>Total</span>

            <span>{Intl.NumberFormat('pt-BR', {
              style: 'currency', 
              currency: 'BRL'
            }).format(document.map(document => document.value)
            )}</span>

            <span>-</span>

            <span>{Intl.NumberFormat('pt-BR', {
              style: 'currency', 
              currency: 'BRL'
            }).format(document.map(document => (
              document.retentions.reduce((soma, response) => (
                soma +=+ (response.percentage/100*response.taxes_documents.calculation)
              ), 0)
            )))}</span>

            <span>=</span>
  
            <span>{Intl.NumberFormat('pt-BR', { 
              style: 'currency', 
              currency: 'BRL'
            }).format(document.map(document => (
              document.value - document.retentions.reduce((soma, response) => ( 
                soma +=+ (response.percentage/100*response.taxes_documents.calculation)
              ), 0)
            )))}</span>

          </div>

        </div>
      </div>
    </div>
  )
}

