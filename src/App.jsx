import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Settings from "./Settings";
import Configuration from "./Configuration";
import Launcher from "./Launcher";

function App() {
  
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/configuration/:id" element={<Configuration />} />
        <Route path = "/launcher/:appname/:id" element ={<Launcher />} />
      </Routes>
    </>
  );
}

export default App;
