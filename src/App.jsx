
import './App.css'
import Navbar from "./components/Navbar.jsx";
import {Routes, Route} from 'react-router-dom';
import Usermanagement from "./components/Usermanagement.jsx";
import BlogOverview from "./pages/BlogOverview.jsx";
import Home from "./pages/Home.jsx";


function App() {


  return (
    <>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usermanagement/" element={<Usermanagement />} />
            <Route path="/blogoverview" element={<BlogOverview />} />
        </Routes>
    </>
  )
}

export default App
