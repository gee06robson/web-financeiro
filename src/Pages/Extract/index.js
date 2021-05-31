import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import api from '../../Services/api'
import { dealWithToken } from '../../Utils/dealWithToken'
import { toConvert, SPMaskBehavior } from '../../Utils/dateFormat'
import $ from 'jquery'


import './styles.css'
const Extrato = () => {
  const { code_list } = useParams()
  const [lista, setLista] = useState([])
  const token = localStorage.getItem('token')
  const code_unity = localStorage.getItem('code_unity')
  const history = useHistory()

  useEffect(() => {
    api.get(`/one_list/${code_unity}/${code_list}`, dealWithToken(token)).then(response => {
      setLista(response.data.documents)
    }).catch(err => {
      console.log(err)
      localStorage.clear()
      history.push('/')
    })
  }, [code_list, token, code_unity, history])
    
  useEffect(() => {
    $('.codigo').mask(SPMaskBehavior)
  }, [lista])
  
  function removeDocument(idDocument) {
    setLista(lista.filter(({ id }) => id !== idDocument))
  }

  return (
    <div className="container-extract" id="container-extract">
      <div className="content-extract">
      {
        lista.map(function(response, indice) {
          return ( 
            <React.Fragment key={response.id}>
              {
                indice === 8 &&  
                <div className="break">
                  ***************************************************************
                </div>
              }

                {
                  indice === 16 ? 
                  <div className="break">
                    ***************************************************************
                  </div> : ''
                }
                  <div className="card-extract" key={response.id} onClick={() => removeDocument(response.id)}>
                    <span className="bold">{response.creditor.reason}</span>
                    <span className="codigo">{response.creditor.code}</span>

                    <div className="line-card">
                      <span className="bold">Número</span>
                      <span>{response.number}</span>
                    </div>

                    <div className="line-card">
                      <span className="bold">Emissão</span>
                      <span>{toConvert(response.emission)}</span>
                    </div>

                    { 
                      response.due && 
                      <div className="line-card">
                        <span className="bold">Vencimento</span>
                        <span>{toConvert(response.due)}</span>
                      </div> 
                    }

                    <div className="line-card">
                      <span className="bold">Valor</span>
                      <span>{Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(response.value)}</span>
                    </div>

                    { 
                      response.retentions.length > 0 &&
                      <table>
                        <thead>
                          <tr>
                            <th className="bold">Cód</th>
                            <th className="bold">%</th>
                            <th className="bold">Calc</th>
                            <th className="bold">Valor</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            response.retentions.map(receita => (
                            <tr key={receita.id}>

                              <td>{receita.code}</td>

                              <td>{Intl.NumberFormat('pt-BR', {
                                style: 'percent', 
                                minimumFractionDigits: 2
                              }).format(receita.percentage/100)}</td>

                              <td>{Intl.NumberFormat('pt-BR', {
                                style: 'currency', 
                                currency: 'BRL'
                              }).format(receita.taxes_documents.calculation)}</td>

                              <td>{Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                              }).format((receita.percentage/100)*receita.taxes_documents.calculation)}</td>

                            </tr>))
                          }
                          <tr>

                            <td colSpan="2" className="bold">Total</td>

                            <td colSpan="2">{Intl.NumberFormat('pt-BR', {
                              style: 'currency', 
                              currency: 'BRL'
                            }).format(response.retentions.reduce(
                              (soma, response) => soma +=+ (response.percentage/100*response.taxes_documents.calculation), 0
                            ))}</td>

                          </tr>

                          <tr>

                            <td colSpan="2" className="bold">Líquido</td>

                            <td colSpan="2">{Intl.NumberFormat('pt-BR', {
                              style: 'currency', 
                              currency: 'BRL'
                            }).format(response.value - response.retentions.reduce(
                              (soma, response) => soma +=+ (response.percentage/100*response.taxes_documents.calculation), 0
                            ))}</td>

                          </tr>

                        </tbody>
                      </table>
                    }
              </div>
            </React.Fragment>
          )
        })
      }
      </div>
    </div>
  )
}

export default Extrato