import NewFile from "./NewFile";
import FileContext from "./FileContext";
import { useContext } from "react";
import SplitPane from "react-split-pane";
import Button from 'react-bootstrap/Button';


function FilesPane() {
  const { files, setCurrFile } = useContext(FileContext);

  return (
    <SplitPane split="horizontal"
      minSize={20}
      defaultSize={parseInt(localStorage.getItem('splitPosFilsPane'), 10)}
      onChange={(size) => localStorage.setItem('splitPosFilsPane', size)}>
      <div>
        <Button type="button" onClick={() => localStorage.setItem('files', JSON.stringify({ files: files }))}>Save Project</Button>
      </div>
      <div  >
        <h4>Files:</h4>
        <ul>
          {files.map((el, i) => {
            return FileDisplay(i, setCurrFile, el);
          })}
        </ul>
        <NewFile></NewFile>
      </div>

    </SplitPane>

  );
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

export default FilesPane;
