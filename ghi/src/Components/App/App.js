import "./App.css";
import Home from "../Home/Home";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchPage from "../SearchPage/SearchPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <>
        <Router>
          <Header />
          <Routes>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/" element={ <Home /> } />
          </Routes>
          <Footer />
        </Router>
      </>
    </div>
  );
}
export default App;
