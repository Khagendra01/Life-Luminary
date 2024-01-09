import "./App.css";

import { AllRouteConfig } from "./routes/Routes";
import { useEffect, useState, createContext } from "react";
import { refreshLogin } from "./api/authApi";
import { AuthContextType, LogInResponse } from "./models/authModel";

export const AuthContext = createContext<AuthContextType | undefined>(
{
  user: null,
  setUser: () => {},
  isLoading: false,
  setIsLoading: () => {},
}
);

function App() {
  const [user, setUser] = useState<LogInResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await refreshLogin();
      setUser(res);
    } catch (error) {
      console.error('Error refreshing login:', error);
      setUser(null);
      localStorage.removeItem('accessToken');
    } 
  };
  

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); 
    if (token) {
      
      getData();
      setIsLoading(false)
    }   
  }, []);

  return (
    <>
        <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
          <AllRouteConfig />
        </AuthContext.Provider>
    </>
  );  
}

export default App;
