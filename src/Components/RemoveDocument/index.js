import { dealWithToken } from '../../Utils/dealWithToken'
import api from '../../Services/api'
import './styles.css'

const RemoveDocument = ({ code_list, id_document, setUpdateList }) => {
  const token =  localStorage.getItem('token')

  const removeDoc = async (data) => {
    await api.post('/remove_document', data, dealWithToken(token)).then(() => {
      setUpdateList(Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10))
    }).catch(err => {
      console.log(err)
    })
  }
  
  return (
    <div id="remove-document">
      <div className="content">
        <button 
          type="button" 
          className="animate__animated  animate__fadeIn"
          onClick={() => removeDoc({ 
            code_list: code_list, 
            id_document: id_document 
          })} >
            <div>            
              REMOVER DOCUMENTO 
            </div>
          </button>
      </div>
    </div>
  )
}

export default RemoveDocument