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

const files = JSON.parse(localStorage.getItem('files')) || [{id:1, name:"nand.js", content:""}];
alert(JSON.stringify(files));

function App() {
  const [currQuote, setCurrQuote] = useState(1);

  return (
    <div className="App">
      <FileContext.Provider value={{  files, currQuote, setCurrQuote }}>
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