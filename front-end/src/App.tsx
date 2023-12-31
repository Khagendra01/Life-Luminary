import "./App.css";

import { AllRouteConfig } from "./routes/Routes";
import { useEffect, useState, createContext } from "react";
import { refreshLogin } from "./api/authApi";
import { AuthContextType, LogInResponse } from "./models/authModel";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

function App() {
  const [user, setUser] = useState<LogInResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const getData = async () => {
      setIsLoading(true);
      await refreshLogin()
        .then((res) => {
          setUser(res);
        })
        .catch(() => {
          setUser(null);
          localStorage.removeItem("accessToken");
        });
      setIsLoading(false);
    };
    if (token) {
      getData();
    }
  }, []);

  return (
    <>
      {user ? (
        <AuthContext.Provider
          value={{ user, setUser, isLoading, setIsLoading }}
        >
          <AllRouteConfig />
        </AuthContext.Provider>
      ) : (
       <div>Loading...</div>
      )}
    </>
  );
}

export default App;
