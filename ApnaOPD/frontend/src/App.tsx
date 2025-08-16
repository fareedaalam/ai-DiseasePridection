import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './MyComponents/Home';
import PetientList from './MyComponents/PetientsList';
import RegisterPatient from './MyComponents/PetientRegister';
import About from './MyComponents/About';
import Layout from './MyComponents/Layout';

export default function App() {
  return (
    <Router>     
      <Routes>       
        {/* Layout wraps all routes */}
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register-patient" element={<RegisterPatient />} />
        <Route path="/patient-list" element={<PetientList />} />
        </Route>
      </Routes>
    </Router>
  );
}
