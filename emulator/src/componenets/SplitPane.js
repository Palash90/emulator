import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import FileContext from "./FileContext";
import SplitPaneContext from "./SplitPaneContext";
import NewFile from "./NewFile";

const SplitPane = ({ children, ...props }) => {
  const [clientHeight, setClientHeight] = useState(null);
  const [clientWidth, setClientWidth] = useState(null);
  const yDividerPos = useRef(null);
  const xDividerPos = useRef(null);

  const onMouseHoldDown = (e) => {
    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
  };

  const onMouseHoldUp = () => {
    yDividerPos.current = null;
    xDividerPos.current = null;
  };

  const onMouseHoldMove = (e) => {
    if (!yDividerPos.current && !xDividerPos.current) {
      return;
    }

    setClientHeight(clientHeight + e.clientY - yDividerPos.current);
    setClientWidth(clientWidth + e.clientX - xDividerPos.current);

    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
  };

  useEffect(() => {
    document.addEventListener("mouseup", onMouseHoldUp);
    document.addEventListener("mousemove", onMouseHoldMove);

    return () => {
      document.removeEventListener("mouseup", onMouseHoldUp);
      document.removeEventListener("mousemove", onMouseHoldMove);
    };
  });

  return (
    <div {...props}>
      <SplitPaneContext.Provider
        value={{
          clientHeight,
          setClientHeight,
          clientWidth,
          setClientWidth,
          onMouseHoldDown,
        }}
      >
        {children}
      </SplitPaneContext.Provider>
    </div>
  );
};

export const Divider = (props) => {
  const { onMouseHoldDown } = useContext(SplitPaneContext);

  return <div {...props} onMouseDown={onMouseHoldDown} />;
};

export const SplitPaneTop = (props) => {
  const topRef = createRef();
  const { clientHeight, setClientHeight } = useContext(SplitPaneContext);
  const { files, setCurrFile } = useContext(FileContext);

  useEffect(() => {
    if (!clientHeight) {
      setClientHeight(topRef.current.clientHeight);
      return;
    }

    topRef.current.style.minHeight = clientHeight + "px";
    topRef.current.style.maxHeight = clientHeight + "px";
  }, [clientHeight]);

  return (
    <div {...props} className="split-pane-top" ref={topRef}>
      <h4>Files:</h4>
      <ul>
        {files.map((el, i) => {
          return FileDisplay(i, setCurrFile, el);
        })}
      </ul>
      <NewFile></NewFile>
    </div>
  );
};

export const SplitPaneBottom = (props) => {
  const files = useContext(FileContext);
  const settings = useContext(SplitPaneContext);
  return (
    <div {...props} className="split-pane-bottom">
      <button type="button" onClick={() => saveFile(files, settings)}>Save Project</button>
    </div>
  );
};

export const SplitPaneLeft = (props) => {
  const topRef = createRef();
  const { clientWidth, setClientWidth } = useContext(SplitPaneContext);

  useEffect(() => {
    if (!clientWidth) {
      setClientWidth(topRef.current.clientWidth / 2);
      return;
    }

    topRef.current.style.minWidth = clientWidth + "px";
    topRef.current.style.maxWidth = clientWidth + "px";
  }, [clientWidth]);

  return <div {...props} className="split-pane-left" ref={topRef} />;
};

export const SplitPaneRight = (props) => {
  const { files, currFile } = useContext(FileContext);
  const file = files.find((el) => el.id === currFile);

  return (
    <div {...props} className="split-pane-right">
      <div className="quote">
        <p>{file && file.content ? file.content : ""}</p>
      </div>
    </div>
  );
};

export default SplitPane;

function saveFile(files, settings) {
  alert("save file called")
  alert(JSON.stringify(files.files));
  return localStorage.setItem('files', JSON.stringify({ files: files.files, settings: settings }));
}

function FileDisplay(i, setCurrFile, el) {
  if (el && el.name && el.name !== '') {
    return <li key={i}>
      <a href="#" onClick={() => setCurrFile(el.id)}>
        {el.name}
      </a>
    </li>;
  } else {
    return <></>
  }
}

