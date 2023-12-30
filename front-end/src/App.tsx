import "./App.css";

import RouteConfig from "./routes/Routes";
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
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");
    const getData = async () => {
      await refreshLogin()
        .then((res) => {
          setUser(res);
          setIsLoading(false);
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
      {user !== null ? (
        <AuthContext.Provider
          value={{ user, setUser, isLoading, setIsLoading }}
        >
          <RouteConfig />
        </AuthContext.Provider>
      ) : (
        <AuthContext.Provider
        value={{ user, setUser, isLoading, setIsLoading }}
      >
        <RouteConfig />
      </AuthContext.Provider>
      )}
    </>
  );
}

export default App;
