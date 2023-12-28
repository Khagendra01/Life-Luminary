
import { createContext } from 'vm'
import './App.css'

import RouteConfig from './routes/Routes'
import { useEffect, useState } from 'react';
import { refreshLogin } from './api/authApi';
import { LogInResponse } from './models/authModel';


export const AuthContext = createContext();


function App() {

  const [user, setUser] = useState<LogInResponse | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const getData = async () => {
      await refreshLogin()
        .then((res) => {
          setUser(res);
        })
        .catch(() => {
          setUser(null);
          localStorage.removeItem("accessToken");
        });
    };
    if (token) {
      getData(); 
    }
  }, []);

  return (
    <>
    <AuthContext.Provider value={{ user, setUser }}>
      <RouteConfig />
    </AuthContext.Provider>
    </>
  )
}

export default App
