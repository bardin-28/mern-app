import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar/Navbar";
import {Loader} from "./components/Loader/Loader";

function App() {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

  if(!ready){
      return <Loader />
  }

  return (
      <AuthContext.Provider
        value={{
            token: token, login: login, logout: logout, userId: userId, isAuthenticated: isAuthenticated,
            ready: ready
        }}
      >
          <Router>
              {isAuthenticated && <Navbar />}

                  {routes}

          </Router>
      </AuthContext.Provider>
  );
}

export default App;
