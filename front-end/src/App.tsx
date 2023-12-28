
import { createContext } from 'vm'
import './App.css'

import RouteConfig from './routes/Routes'

export const AuthContext = createContext();


function App() {

  const [user, setUser] = useState()

  const token = localStorage.getItem("accessToken");

  return (
    <>
      <RouteConfig />
    </>
  )
}

export default App
