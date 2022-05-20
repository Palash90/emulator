import NewFile from "./NewFile";
import FileContext from "./FileContext";
import { useContext } from "react";
import SplitPane from "react-split-pane";
import Button from 'react-bootstrap/Button';
import runSimulation from "./hdlSimulator";


function FilesPane() {
  const { files, currFile, setCurrFile, setFiles } = useContext(FileContext);

  return (
    <SplitPane split="horizontal"
      minSize={45}
      defaultSize={parseInt(localStorage.getItem('splitPosFilesPane') || "45")}
      onChange={(size) => localStorage.setItem('splitPosFilesPane', size)}>

      <div className="btn-group btn-group-sm" role="group" >
        <Button className="btn-success" type="button" onClick={() => localStorage.setItem('files', JSON.stringify(files))}>Save Project</Button>
        <Button type="button" onClick={() => runSimulation(currFile, files)}>Run</Button>
        <Button className="btn-danger" type="button" onClick={() => deleteProject()}>Delete</Button>
      </div>
      <div  >
        <h6>Files:</h6>
        <ul>
          {files.map((el, i) => {
            return FileDisplay(i, setCurrFile, el);
          })}
        </ul>
        <NewFile></NewFile>
      </div>
    </SplitPane>
  );

  function deleteProject() {
    setFiles([])
    return localStorage.setItem('files', JSON.stringify([]));
  }
}

function FileDisplay(i, setCurrFile, el) {
  if (el && el.name && el.name !== '') {
    return <a key={i} href="#" onClick={() => setCurrFile(el.key)}>
      <li>
        {el.name}
      </li>
    </a>;
  } else {
    return <></>
  }
}

export default FilesPane;
