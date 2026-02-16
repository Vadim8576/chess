import { BrowserRouter, Routes, Route, Outlet } from "react-router"
import LocalGamePage from "./pages/LocalGamePage/LocalGamePage"
import FastOnlineGamePage from "./pages/FastOnlineGamePage/FastOnlineGamePage"
import Home from "./pages/Home/Home"
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import RateGamePage from "./pages/RateGamePage/RateGamePage";
import GameLobby from "./pages/GameLobby";
import GameList from "./pages/GameList";
import { COLORS } from "./constants/gameInitial";
import CreateOnlineGamePage from "./pages/CreateOnlineGamePage";





const Layout = () => {
  return (
    <div className="layout" style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      backgroundColor: COLORS.background
    }}>
      <Header />
      <main style={{
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
            <Route path="/create-game" element={<CreateOnlineGamePage />} />
            <Route path="/local" element={<LocalGamePage />} />
            <Route path="/gamelist" element={<GameList />} />
            <Route path="/fastgame/:gameId" element={<FastOnlineGamePage />} />
            <Route path="/lobby/:gameId" element={<GameLobby />} />
            <Route path="/rate" element={<RateGamePage />} />
            {/* <Route path="*" element={<NoMatch />} /> 404-страница */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
