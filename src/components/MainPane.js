import SplitPane from "react-split-pane";
import FilesPane from "./FilesPane";
import { EditorPane } from "./EditorPane";
import Button from 'react-bootstrap/Button';
import runSimulation from "./hdlSimulator";
import FileContext from "./FileContext";
import { useContext } from "react";

import SimulationContext from "./SimulationContext";

export default function MainPane() {
    const { files, currFile, setCurrFile, setFiles } = useContext(FileContext);
    const { setSimulationResult } = useContext(SimulationContext);
    function deleteProject() {
        setFiles([])
        return localStorage.setItem('files', JSON.stringify([]));
    }
    return <SplitPane split="horizontal" minSize={30}
        defaultSize={parseInt(localStorage.getItem('splitPosMainPane') || 30)}
        onChange={(size) => localStorage.setItem('splitPosMainPane', size)}>
        {ButtonPane(files, currFile, setSimulationResult, deleteProject)}
        <SplitPane split="vertical"
            minSize={230}
            defaultSize={parseInt(localStorage.getItem('splitPosBottomPane') || 230)}
            onChange={(size) => localStorage.setItem('splitPosBottomPane', size)}>
            <FilesPane />
            <EditorPane />
        </SplitPane></SplitPane>;
}
function ButtonPane(files, currFile, setSimulationResult, deleteProject) {
    return <div className="btn-group btn-block btn-group-xs buttonPane" role="group">
        <Button className="btn-dark btn-sm" type="button" onClick={() => localStorage.setItem('files', JSON.stringify(files))}>Save</Button>
        <Button className="btn-dark btn-sm" type="button" onClick={() => runSimulation(currFile, files, (result) => setSimulationResult(result))}>Run</Button>
        <Button className="btn-dark btn-sm" type="button" href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(files))}`} download="project.json">Download</Button>
        <Button className="btn-dark btn-sm" type="button" onClick={() => deleteProject()}>Delete</Button>
    </div>;
}

