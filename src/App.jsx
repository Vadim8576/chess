import { BrowserRouter, Routes, Route, Outlet } from "react-router"
import MainPage from "./pages/MainPage/MainPage"
import AnonymousGame from "./pages/AnonymousGame/AnonymousGame"
import Home from "./pages/Home/Home"
import Header from "./pages/Header";
import Footer from "./pages/Footer";



const Layout = () => {
  return (
    <div className="layout" style={{
      width: '100%',
      height: '100%'
    }}>
      <Header />
      <main style={{
        width: '100%',
        height: '100%'
      }}>
        <Footer />
      </main>
    </div>
  );
};

const App = () => {
  return (
    <div id="game">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/anonymousgame" element={<AnonymousGame />} />
            {/* <Route path="*" element={<NoMatch />} /> 404-страница */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
