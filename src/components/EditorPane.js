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
import uuid from "react-uuid";

export const EditorPane = (props) => {
    const { files, currFile, setFiles, openFiles, setOpenFiles, setCurrFile } = useContext(FileContext);
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
        <MultipleEditors editorWidth={props.editorWidth} openFiles={openFiles} currFile={currFile} setCurrFile={setCurrFile} save={saveNewCode} closeFile={closeFile} />
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
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    const chooseOrCloseFile = (element, closeFile) => {
        if (!closeFile) {
            props.setCurrFile(element)
        } else {
            props.closeFile(element)
        }
    }

    if (props.openFiles && props.openFiles.length > 0) {
        return <div key={uuid()}>
            <div key={uuid()} style={{ display: "flex", flexDirection: "row" }}>{
                props.openFiles.map(element => {
                    var file = files.filter(el => el.key === element)[0];
                    return file ? <div key={uuid()} className="text-white file-header" >
                        <span key={uuid()} onClick={() => chooseOrCloseFile(element, false)}>{file.name}</span>
                        <CloseButton key={uuid()} style={{ width: '2px', height: '2px', verticalAlign: 'top', margin: '3px', padding: '0.3em 0.3em' }} onClick={() => chooseOrCloseFile(element, true)} />
                    </div> : <></>
                })
            }</div>
            <div key={uuid()} style={{ position: "relative" }}>
                {props.openFiles.map(element => {
                    var file = files.filter(el => el.key === element)[0];
                    return file ? <div key={uuid()} style={{ margin: "5px", position: "absolute", textAlign: "left", zIndex: props.currFile === element ? 10 : 0 }}>
                        <CodeMirror
                            value={file.content}
                            theme={oneDark}
                            extensions={[javascript({ jsx: true })]}
                            height={vh * 85 / 100 + "px"}
                            width={(vw * 99 / 100 - props.editorWidth) + "px"}
                            onChange={(value, viewUpdate) => {
                                props.save(element, value);
                            }}
                            key={uuid()}
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
