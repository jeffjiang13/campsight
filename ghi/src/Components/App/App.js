import "./App.css";
import Home from "../Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "../Login/Authorization"
import NavBar from '../Header/Header'
import UserProfile from '../Login/UserProfile'
import LogIn from '../Login/Login'
import LogOut from '../Login/Logout'
import Signup from "../Login/SignUp"
import { useState, useEffect } from "react"
import { UserContext } from "../Login/UserContext"
function App() {
  const domain = /https:\/\/[^/]+/
  const basename = process.env.PUBLIC_URL.replace(domain, '')

  const [userId, setUserId] = useState('')

  useEffect(() => {
    const getUserdata = async () => {
        const url = `${process.env.REACT_APP_USERS}/users/api/tokens/user/`;
        const response = await fetch(url, { credentials: "include" });
        if (response.ok) {
            const userData = await response.json()
            setUserId(await userData)
        }
    }
    getUserdata()

  }, [])


  return (
        <div className="App">

          <UserContext.Provider value={{
            userId, setUserId
          }}>
          <AuthProvider>
            <BrowserRouter basename={basename}>
                <NavBar />

            <Home />
            {/* <Cards /> */}
            {/* <Favorites /> */}
            {/* <Login/> */}
            <Routes>
                  {/* <Route path="/" element={<MainPage />} /> */}
                  <Route path="profile/:id" element={<UserProfile />} />
                  <Route path="login" element={<LogIn />} />
                  <Route path="logout" element={<LogOut />} />
                  <Route path="signup" element={<Signup />} />

            </Routes>
            </BrowserRouter>
          </AuthProvider>
          </UserContext.Provider>
        </div>
    );
}

export default App;
