import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import NewJoke from "./pages/NewJoke";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/new" element={<NewJoke />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
