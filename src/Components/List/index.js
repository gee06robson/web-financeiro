import { useState, useEffect } from 'react'
import { dealWithToken } from '../../Utils/dealWithToken'
import { toConvert } from '../../Utils/dateFormat'
import { styles } from '../../Utils/styles'
import { Link, useParams } from 'react-router-dom'
import { RotateSpinner } from 'react-spinners-kit'
import { Scrollbars } from 'react-custom-scrollbars';
import { HiLink } from 'react-icons/hi'
import api from '../../Services/api'
import './styles.css'

const List = ({ setUpdateList }) => {
  const [list, setList] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')
  const unity = localStorage.getItem('code_unity')
  const { code_list } = useParams()

  useEffect(() => {
    setLoading(true)
    api.get(`/lists/${unity}`, dealWithToken(token)).then(response => {
      setTimeout(() => {
        setLoading(false)
        setList(response.data)
      }, 500)
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }, [token, count, unity, setUpdateList])

  const addList = async (code_unity) => {
    await api.post('/newlist', {
      code_unity
    }, dealWithToken(token)).then(response => {
      setCount(count+1)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div id="list">

      <div className="title">
        {loading ? <RotateSpinner size={18} color="var(--discord)" /> : <span>Listas</span> }
      </div>

      <Scrollbars style={styles} autoHide >
      <div className="content-list">
        {list.map(list => (
          <div className={`card-list ${list.code_list===code_list && 'selected'}`} key={list.code_list} >
            <span>{list.code_list}</span>
            <span>{toConvert(list.createdAt)}</span>
            <span><strong>REF - </strong>{list.linked_to ==="" ? 'documento não informado' : list.linked_to}</span>
            {list.documents.length>0 && <i>{list.documents.length} documento{list.documents.length>1&&'s'}</i>}

            <div className="link">
              <Link to={`/newdocument/${list.code_list}`} >
                <HiLink size={28} color="var(--discord)" />
                <span>Selecionar</span>
              </Link>
            </div> 

          </div>
        ))}
      </div>
      </Scrollbars>

      <div className="content-button">
        <button type="button" onClick={() => addList(localStorage.getItem('code_unity'))} >
          <div>CADASTRAR</div>
        </button>
      </div>
    </div>
  )
}

export default List