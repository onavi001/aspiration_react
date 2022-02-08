import SearchBody from './components/SearchBody'
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import './style/App.css';
function App() {
  return (
    <>
        <Header/>
        <Routes>
          <Route path="/:search" element={<SearchBody/>} />
        </Routes>
    </>
  );
}

export default App;
