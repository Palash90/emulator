import { useContext, useState } from "react";
import FileContext from "./FileContext";
import SplitPane from "react-split-pane";

import "./Editor.css";
import OutputWindow from "./OutputWindow";
import CodeMirror from '@uiw/react-codemirror';
import "codemirror/lib/codemirror.css";
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { CloseButton } from "react-bootstrap";

export const EditorPane = (props) => {
    const { files, currFile, setFiles, openFiles, setOpenFiles, setCurrFile } = useContext(FileContext);

    const [editorHeight, setEditorHeight] = useState(parseInt(localStorage.getItem('splitPosEditorPane') || "400"));

    const file = files.find((el) => el.key === currFile);

    var fileOpen = openFiles ? openFiles.filter(el => el === currFile).length > 0 : false;

    var closeFile = (key) => {
        var newOpenfiles = openFiles.filter(el => el !== key);
        if (newOpenfiles.length > 1) {
            setCurrFile(newOpenfiles[newOpenfiles.length - 1]);
        } else {
            setCurrFile(-1);
        }
        setOpenFiles([...newOpenfiles]);
    };

    var newOpenFiles;

    if (!fileOpen) {
        if (openFiles && openFiles.length > 0) {
            newOpenFiles = [...openFiles]
            handleNewOpenFiles();
        } else {
            newOpenFiles = []
            handleNewOpenFiles();
        }
    }

    var saveNewCode = (key, code) => {
        var newFile = { key: key, name: file.name, content: code };
        var newFiles = files.filter(function (f) {
            return f.key !== key;
        });

        newFiles.push(newFile);
        newFiles = newFiles.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        setFiles(newFiles);
    };

    return (
        <SplitPane split="horizontal"
            minSize={400}
            defaultSize={editorHeight}
            onChange={(size) => { setEditorHeight(size); localStorage.setItem('splitPosEditorPane', size); }}>
            <MultipleEditors editorHeight={editorHeight} openFiles={openFiles} currFile={currFile} setCurrFile={setCurrFile} save={saveNewCode} closeFile={closeFile} />
            <div className="editor">
                <h6 className="output">Simulation Output</h6>
                <OutputWindow />
            </div>
        </SplitPane >
    );

    function handleNewOpenFiles() {
        if (file) {
            newOpenFiles.push(file.key);
            setOpenFiles(newOpenFiles);
        }
    }
};

function MultipleEditors(props) {
    const { files } = useContext(FileContext);

    const chooseOrCloseFile = (element, closeFile) => {
        if (!closeFile) {
            props.setCurrFile(element)
        } else {
            props.closeFile(element)
        }
    }

    if (props.openFiles && props.openFiles.length > 0) {
        return <div>
            <div style={{ display: "flex", flexDirection: "row" }}>{
                props.openFiles.map(element => {
                    var file = files.filter(el => el.key === element)[0];

                    return file ? <div key={element} className="text-white file-header" >
                        <span onClick={() => chooseOrCloseFile(element, false)}>{file.name}</span>
                        <CloseButton style={{ width: '2px', height: '2px', verticalAlign: 'top', margin: '3px', padding: '0.3em 0.3em' }} onClick={() => chooseOrCloseFile(element, true)} />
                    </div> : <></>
                })
            }</div>
            <div style={{ position: "relative" }}>
                {props.openFiles.map(element => {
                    var file = files.filter(el => el.key === element)[0];
                    return file ? <div key={file.key} style={{ margin: "5px", position: "absolute", textAlign: "left", zIndex: props.currFile === element ? 10 : 0 }}>
                        <CodeMirror
                            value={file.content}
                            theme={oneDark}
                            extensions={[javascript({ jsx: true })]}
                            height={(props.editorHeight * 90 / 100) + "px"}
                            width="87vw"
                            onChange={(value, viewUpdate) => {
                                props.save(element, value);
                            }}
                        />
                    </div> : <></>
                })}
            </div>
        </div>
    }
    else {
        return <></>
    }

}
