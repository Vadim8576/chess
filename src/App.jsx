import { BrowserRouter, Routes, Route, Outlet } from "react-router"
import LocalGamePage from "./pages/LocalGamePage/LocalGamePage"
import FastOnlineGamePage from "./pages/FastOnlineGamePage/FastOnlineGamePage"
import Home from "./pages/Home/Home"
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import RateGamePage from "./pages/RateGamePage/RateGamePage";



const Layout = () => {
  return (
    <div className="layout" style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%'
    }}>
      <Header />
      <main style={{
        // width: '100%',
        // height: '100%',
        flexGrow: '1'
      }}>
        <Outlet />
      </main>
      <Footer />
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
            {/* <Route path="/" element={<LocalGamePage />} /> */}
            <Route path="/local" element={<LocalGamePage />} />
            <Route path="/fast" element={<FastOnlineGamePage />} />
            <Route path="/rate" element={<RateGamePage />} />
            {/* <Route path="*" element={<NoMatch />} /> 404-страница */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
