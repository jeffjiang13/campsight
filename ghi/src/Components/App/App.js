import "./App.css";
import Home from "../Home/Home";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Details from "../DetailPage/DetailPage";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserProfile from '../Profile/ProfilePage'
import LogIn from '../Login/Login'
import SignUp from "../Login/SignUp"
// import LogOut from "../Login/LogOut"
import EditProfile from "../Profile/EditProfile"
import EventList from '../Event/Event'
import CreateEvent from '../Event/CreateEvent'
import Activities from '../Activities/Activities'
import AdvancedSearchForm from '../Search/AdvancedSearchForm'



function App() {

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");



  return (
    <BrowserRouter basename={basename}>
      <Header />
      <Routes>
        <Route path="/search/:parkCode" element={<Details />} />
        <Route path="/" element={<Home />} />
        <Route path="profile/:id" element={<UserProfile />} />
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="profile/edit/:id" element={<EditProfile />} />
        <Route path="events" element={<EventList />} />
        <Route path="create" element={<CreateEvent />} />
        <Route path="activities" element={<Activities />} />
        <Route path="advancedsearch" element={<AdvancedSearchForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
