import SplitPane, {
  Divider,
  SplitPaneBottom,
  SplitPaneLeft,
  SplitPaneRight,
  SplitPaneTop,
} from "./SplitPane";
import FileContext from "./FileContext";
import { useState } from "react";

import "./App.css";

const existingFiles = JSON.parse(localStorage.getItem('files')) ? JSON.parse(localStorage.getItem('files')).files || [] : [];

function App() {
  const [currFile, setCurrFle] = useState(1);
  const [files, setFiles] = useState(existingFiles);

  return (
    <div className="App">
      <FileContext.Provider value={{ files, currFile, setCurrFle, setFiles }}>
        <SplitPane className="split-pane-row">
          <SplitPaneLeft>
            <SplitPane className="split-pane-col">
              <SplitPaneTop />
              <Divider className="separator-row" />
              <SplitPaneBottom />
            </SplitPane>
          </SplitPaneLeft>
          <Divider className="separator-col" />

          <SplitPaneRight />
        </SplitPane>
      </FileContext.Provider>
    </div>
  );
}

export default App;