import NewFile from "./NewFile";
import FileContext from "./FileContext";
import { useContext } from "react";
import SplitPane from "react-split-pane";
import Button from 'react-bootstrap/Button';
import runSimulation from "./hdlSimulator";
import SimulationContext from "./SimulationContext";


function FilesPane() {
  const { files, currFile, setCurrFile, setFiles } = useContext(FileContext);
  const { setSimulationResult } = useContext(SimulationContext);

  return (
    <SplitPane split="horizontal"
      minSize={45}
      defaultSize={parseInt(localStorage.getItem('splitPosFilesPane') || "45")}
      onChange={(size) => localStorage.setItem('splitPosFilesPane', size)}>

      <div className="btn-group btn-group-sm" role="group" >
        <Button className="btn-success" type="button" onClick={() => localStorage.setItem('files', JSON.stringify(files))}>Save</Button>
        <Button type="button" onClick={() => runSimulation(currFile, files, (result) => setSimulationResult(result))}>Run</Button>
        <Button className="btn-success" type="button" href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(files))}`} download="project.json">Download</Button>
        <Button className="btn-danger" type="button" onClick={() => deleteProject()}>Delete</Button>
      </div>
      <div  >
        <h6>Files:</h6>
        <ul>
          {files.map((el, i) => {
            return FileDisplay(i, currFile, setCurrFile, el);
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

function FileDisplay(i, currFile, setCurrFile, el) {
  if (el && el.name && el.name !== '') {
    return <a key={i} href="#" onClick={() => setCurrFile(el.key)}>
      <li className={el.key == currFile?"selectedFile":"unselectedFile"}>
        {el.name}
      </li>
    </a>;
  } else {
    return <></>
  }
}

export default FilesPane;
