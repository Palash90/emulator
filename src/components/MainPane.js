import SplitPane from "react-split-pane";
import FilesPane from "./FilesPane";
import { EditorPane } from "./EditorPane";
import Button from 'react-bootstrap/Button';
import runSimulation from "./hdlSimulator";
import FileContext from "./FileContext";
import { useContext } from "react";

import SimulationContext from "./SimulationContext";
import ModalContext from "./ModalContext";

export default function MainPane() {
    const { files, currFile } = useContext(FileContext);
    const { setSimulationResult } = useContext(SimulationContext);

    return <SplitPane split="horizontal" minSize={35}
        defaultSize={parseInt(localStorage.getItem('splitPosMainPane') || 35)}
        onChange={(size) => localStorage.setItem('splitPosMainPane', size)}>
        {ButtonPane(files, currFile, setSimulationResult)}
        <SplitPane split="vertical"
            minSize={230}
            defaultSize={parseInt(localStorage.getItem('splitPosBottomPane') || 230)}
            onChange={(size) => localStorage.setItem('splitPosBottomPane', size)}>
            <FilesPane />
            <EditorPane />
        </SplitPane></SplitPane>;
}
function ButtonPane(files, currFile, setSimulationResult) {

    const { setModalOptions } = useContext(ModalContext);
    const { setFiles } = useContext(FileContext);

    const showDeleteProjectModal = () => setModalOptions({ confirmAction: () => deleteProject(), showModal: true, title: "Delete Project?", body: "If you delete this project, no component will be saved." });

    const showNewProjectModal = () => setModalOptions({ confirmAction: () => deleteProject(), showModal: true, title: "Create new Project?", body: "If you create a new project, current project will be lost and you will loose all data." });

    function deleteProject() {
        setFiles([])
        return localStorage.setItem('files', JSON.stringify([]));
    }

    return <div className="btn-group btn-block btn-group-xs buttonPane" role="group">
        <Button className="btn-dark btn-sm" type="button" onClick={() => showNewProjectModal()}>New</Button>
        <Button className="btn-dark btn-sm" type="button" onClick={() => localStorage.setItem('files', JSON.stringify(files))}>Save</Button>
        <Button className="btn-dark btn-sm" type="button" onClick={() => runSimulation(currFile, files, (result) => setSimulationResult(result))}>Run</Button>
        <Button className="btn-dark btn-sm" type="button" href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(files))}`} download="project.json">Download</Button>
        <Button className="btn-dark btn-sm" type="button" onClick={() => showDeleteProjectModal()}>Delete</Button>
    </div>;
}

