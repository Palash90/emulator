
import FileContext from "./FileContext";
import SimulationContext from "./SimulationContext";
import { useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPane from "./MainPane";

const existingFiles = JSON.parse(localStorage.getItem('files')) ? JSON.parse(localStorage.getItem('files')) || [] : [];

function App() {
  const [simulationResult, setSimulationResult] = useState({});
  const [currFile, setCurrFile] = useState(1);
  const [files, setFiles] = useState(existingFiles);

  return (
    <div className="App">
      <SimulationContext.Provider value={{ simulationResult, setSimulationResult }}>
        <FileContext.Provider value={{ files, currFile, setCurrFile, setFiles }}>
          <MainPane />
        </FileContext.Provider>
      </SimulationContext.Provider>
    </div>
  );
}
export default App;

