import MapPage from "../src/MapPage/MapPage.jsx"
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.js';
import About from "./Pages/About.js";



function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/training' element={<About />} />
        <Route path='/map' element={<MapPage />} />
      </Routes>
    </div>
  );
}

export default App;
