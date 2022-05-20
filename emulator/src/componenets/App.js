import SplitPane from "react-split-pane";
import FileContext from "./FileContext";
import { useState } from "react";
import FilesPane from "./FilesPane";
import { EditorPane } from "./EditorPane";
import "./App.css";

const existingFiles = JSON.parse(localStorage.getItem('files')) ? JSON.parse(localStorage.getItem('files')).files || [] : [];

function App() {
  const [currFile, setCurrFile] = useState(1);
  const [files, setFiles] = useState(existingFiles);

  return (
    <div className="App">
      <FileContext.Provider value={{ files, currFile, setCurrFile, setFiles }}>
        <SplitPane split="vertical"
          minSize={50}
          defaultSize={parseInt(localStorage.getItem('splitPos'), 10)}
          onChange={(size) => localStorage.setItem('splitPos', size)}>
          <FilesPane />
          <EditorPane/>
        </SplitPane>
      </FileContext.Provider>
    </div>
  );
}

export default App;
