import { useRef } from "react"
import { MetroSpinner } from "react-spinners-kit"
import './styles.css'


const Loading = ({state}) => {
  const loading = useRef(state)

  if (state === true) {
    return (  
      <div id="loading">
        <MetroSpinner size={30} color="var(--discord)" loading={loading.current} />
      </div>
    )
  } else {
    return false
  }
}

export default Loading