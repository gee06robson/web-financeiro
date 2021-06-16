import { useState, useEffect} from 'react'
import { dealWithToken } from '../../Utils/dealWithToken'
import { toConvert, currencyFormat, SPMaskBehavior } from '../../Utils/dateFormat'
import { styles } from '../../Utils/styles'
import { Scrollbars } from 'react-custom-scrollbars'
import { useParams } from 'react-router-dom'
import { RotateSpinner } from 'react-spinners-kit'
import { HiLink } from 'react-icons/hi'
import $ from 'jquery'
import api from '../../Services/api'
import './styles.css'

const ListDocuments = ({ setUpdateList, updateList }) => {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')
  const unity = localStorage.getItem('code_unity')
  const { code_list } = useParams()

  useEffect(() => {
    setLoading(true)
    api.get(`/document/${unity}`, dealWithToken(token)).then(response => {
      setTimeout(() => {
        setLoading(false)
        setDocuments(response.data)
      }, 500)
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }, [token, unity, code_list, updateList])

  useEffect(() => {
    $('.code').mask(SPMaskBehavior)
  }, [documents])

  const addDocs = async (data) => {
    setLoading(true)
    await api.post('/add_document', data, dealWithToken(token)).then(response => {
      setTimeout(() => {
        setLoading(false)
        setUpdateList(updateList + Math.floor(Math.random() * 10))
      }, 500)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div id="link_documents">

      <div className="title">
        {loading ? <RotateSpinner size={18} color="var(--discord)" /> : <span>Documentos</span> }
      </div>

      <Scrollbars style={styles} autoHide >
      <div className="content-link-documents">
        {documents.map(document =>
        <div className="card-document" key={document.id} >
          <span>{document.creditor.reason}</span>
          <span className="code">{document.creditor.code}</span>
          <div className="share"></div>
          <span>{document.number}</span>
          <span>{toConvert(document.emission)}</span>
          <span>{currencyFormat(document.value)}</span>  

          <div className="link" onClick={() => addDocs({code_list: code_list, id_document: document.id})}>
            <div className="content">
              <HiLink size={28} color="var(--discord)" />
              <span>Selecionar</span>
            </div>
          </div>

        </div>
        )}
      </div>
      </Scrollbars>

      <div className="by">
        <span>by @Robson</span>
      </div>

    </div>
  )
}

export default ListDocuments