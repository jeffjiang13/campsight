import "./App.css";
import Home from "../Home/Home";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchPage from "../SearchPage/SearchPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "../Login/Authorization"
import NavBar from '../Header/Header'
import UserProfile from '../Profile/ProfilePage'
import LogIn from '../Login/Login'
import LogOut from '../Login/Logout'
import Signup from "../Login/SignUp"
import { useState, useEffect } from "react"
import { Context } from "../Login/Context"
import EditProfile from "../Profile/EditProfile"
import EventList from '../Event/Event'
import CreateEvent from '../Event/CreateEvent'
import Activities from '../Activities/Activities'



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


      <Context.Provider value={{
        userId, setUserId
      }}>
        <AuthProvider>
          <Router basename={basename}>

            {/* <Cards /> */}
            {/* <Favorites /> */}
            {/* <Login/> */}
            <Header />
            <Routes>
              <Route path="/search" element={<SearchPage />} />
              <Route path="/" element={<Home />} />
              <Route path="profile/:id" element={<UserProfile />} />
              <Route path="login" element={<LogIn />} />
              <Route path="logout" element={<LogOut />} />
              <Route path="signup" element={<Signup />} />
              <Route path="profile/edit/:id" element={<EditProfile />} />
              <Route path="events" element={<EventList />} />
              <Route path="create" element={<CreateEvent />} />
              <Route path="activities" element={<Activities />} />

            </Routes>
            <Footer />
          </Router>
        </AuthProvider>
      </Context.Provider>
    </div>
  );
}
export default App;
