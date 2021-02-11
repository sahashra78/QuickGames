import React from 'react'
import "./Components/FontAwesomeIcon.js"
import {Routes, Route} from 'react-router-dom'
import Navbar from "./Components/Navbar.js"
import Games from "./Components/Games.js"
import Footer from "./Components/Footer.js"
import RockPaperScissor from "./Components/RockPaperScissor.js"
import MathGenius from "./Components/MathGenius.js"
import TicTacToe from "./Components/TicTacToe.js"
import "./Components/sass/style.scss"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Games />} />
        <Route path="/RockPaperScissor" element={<RockPaperScissor />} />
        <Route path="/MathGenius" element={<MathGenius />} />
        <Route path="/TicTacToe" element={<TicTacToe />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
