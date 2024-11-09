import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/AdminNavbar";
import HomePage from "./adminPages/Homepage";
import Categories from "./adminPages/categories";

function App() {
  return (
    <Router>
          <Routes>
            <Route path="/adminhome" element={<HomePage />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
    </Router>
  );
}

export default App;
