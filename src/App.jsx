import { BrowserRouter, Routes, Route } from "react-router"
import MainPage from "./pages/MainPage/MainPage"
import AnonymousGame from "./pages/AnonymousGame/AnonymousGame"




function App() {
  return (
    <div id="game">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/anonymousgame" element={<AnonymousGame />} />
        {/* <Route path="*" element={<NoMatch />} /> 404-страница */}
      </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
