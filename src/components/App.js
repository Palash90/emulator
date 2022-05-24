
import FileContext from "./FileContext";
import SimulationContext from "./SimulationContext";
import { useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPane from "./MainPane";
import defaultFiles from './defaultFiles';

const storedFiles = JSON.parse(localStorage.getItem('files'));
const existingFiles = storedFiles && storedFiles.length > 0 ? storedFiles || defaultFiles : defaultFiles;

function App() {
  const [simulationResult, setSimulationResult] = useState({});
  const [currFile, setCurrFile] = useState(1);
  const [files, setFiles] = useState(existingFiles);
  const [openFiles, setOpenFiles] = useState();

  return (
    <div className="App">
      <SimulationContext.Provider value={{ simulationResult, setSimulationResult }}>
        <FileContext.Provider value={{ files, setFiles, currFile, setCurrFile, openFiles, setOpenFiles }}>
          <MainPane />
        </FileContext.Provider>
      </SimulationContext.Provider>
    </div>
  );
}
export default App;

