import SplitPane from "react-split-pane";
import FilesPane from "./FilesPane";
import { EditorPane } from "./EditorPane";
import Button from 'react-bootstrap/Button';
import runSimulation from "./hdlSimulator";
import FileContext from "./FileContext";
import { useContext, useState } from "react";

import SimulationContext from "./SimulationContext";
import ModalContext from "./ModalContext";
import OutputWindow from "./OutputWindow";
import HelpWindow from "./HelpWindow";

export default function MainPane() {
    const [editorEnabled, setEditorEnabled] = useState(true);
    const [helpEnabled, setHelpEnabled] = useState(false);
    const { files, currFile } = useContext(FileContext);
    const { setSimulationResult } = useContext(SimulationContext);
    const [editorWidth, setEditorWidth] = useState(parseInt(localStorage.getItem('splitPosBottomPane') || 230));

    const handleEditorWidthResize = (size) => {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

        if (size < vw * 70 / 100) {
            setEditorWidth(size);
            localStorage.setItem('splitPosBottomPane', size)
        } else {
            setEditorWidth(editorWidth);
        }
    }

    return <SplitPane split="horizontal" minSize={35}
        defaultSize={parseInt(localStorage.getItem('splitPosMainPane') || 35)}
        onChange={(size) => localStorage.setItem('splitPosMainPane', size)}>
        {ButtonPane(files, currFile, setSimulationResult, setEditorEnabled, helpEnabled, setHelpEnabled)}
        {
            helpEnabled ? <HelpWindow /> : <SplitPane split="vertical"
                minSize={230}
                defaultSize={editorWidth}
                onChange={(size) => handleEditorWidthResize(size)}>
                <FilesPane setEditorEnabled={setEditorEnabled} setHelpEnabled={setHelpEnabled} />
                {
                    editorEnabled ? <EditorPane editorWidth={editorWidth} /> : <OutputWindow editorWidth={editorWidth} />
                }
            </SplitPane>
        }

    </SplitPane>;
}
function ButtonPane(files, currFile, setSimulationResult, setEditorEnabled, helpEnabled, setHelpEnabled) {

    const { setModalOptions } = useContext(ModalContext);
    const { setFiles } = useContext(FileContext);

    const showDeleteProjectModal = () => setModalOptions({ confirmAction: () => deleteProject(), showModal: true, title: "Delete Project?", body: "If you delete this project, no component will be saved." });

    const showNewProjectModal = () => setModalOptions({ confirmAction: () => deleteProject(), showModal: true, title: "Create new Project?", body: "If you create a new project, current project will be lost and you will loose all data." });

    function deleteProject() {
        setFiles([])
        return localStorage.setItem('files', JSON.stringify([]));
    }

    const handleShow = () => {
        var body = "Project Saved";
        setModalOptions({ info: true, showModal: true, body: body });
        setTimeout(() => setModalOptions({ showModal: false, info: true }), 1000);
    }

    return <div className="btn-group btn-block btn-group-xs buttonPane" role="group">
        <Button className="btn-dark btn-sm" type="button" disabled={helpEnabled} onClick={() => showNewProjectModal()}>New</Button>
        <Button className="btn-dark btn-sm" type="button" disabled={helpEnabled} onClick={() =>{ localStorage.setItem('files', JSON.stringify(files)); handleShow(); }}>Save Project</Button>
        <Button className="btn-dark btn-sm" type="button" disabled={helpEnabled} onClick={() => { setHelpEnabled(false); setEditorEnabled(true) }}>Edit</Button>
        <Button className="btn-dark btn-sm" type="button" disabled={helpEnabled} onClick={() => { setHelpEnabled(false); setEditorEnabled(false); runSimulation(currFile, files, (result) => setSimulationResult(result)) }}>Run</Button>
        <Button className="btn-dark btn-sm" type="button" disabled={helpEnabled} href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(files))}`} download="project.json">Download</Button>
        <Button className="btn-dark btn-sm" type="button" disabled={helpEnabled} onClick={() => showDeleteProjectModal()}>Delete Project</Button>
        <Button className="btn-dark btn-sm" type="button" onClick={() => setHelpEnabled(!helpEnabled)}>{helpEnabled ? "Back" : "Help"}</Button>
    </div >;
}

