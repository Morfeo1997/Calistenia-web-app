import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Entrenar from './pages/Entrenar';
import Ejercicios from './pages/Ejercicios';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
		  <BrowserRouter>
          <Navbar />
    
          <Routes>
            <Route path="/" element={<Entrenar />} />
            
            <Route path="/galeria" element={<Ejercicios />} />
            {/*
            <Route path="/contacto" element={<Contacto />} />
            */}
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
