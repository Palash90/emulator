
import FileContext from "./FileContext";
import { useState } from "react";
import "./App.css";
import MainPane from "./MainPane";

const existingFiles = JSON.parse(localStorage.getItem('files')) ? JSON.parse(localStorage.getItem('files')).files || [] : [];

function App() {
  const [currFile, setCurrFile] = useState(1);
  const [files, setFiles] = useState(existingFiles);

  return (
    <div className="App">
      <FileContext.Provider value={{ files, currFile, setCurrFile, setFiles }}>
        <MainPane />
      </FileContext.Provider>
    </div>
  );
}
export default App;

