import { useContext, useState } from "react";
import FileContext from "./FileContext";
import SplitPane from "react-split-pane";

import "./Editor.css";
import OutputWindow from "./OutputWindow";
import CodeMirror from '@uiw/react-codemirror';
import "codemirror/lib/codemirror.css";
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';

export const EditorPane = (props) => {
    const { files, currFile, setFiles, openFiles, setOpenFiles } = useContext(FileContext);
    const file = files.find((el) => el.key === currFile);
    const propFile = { ...file }

    console.log(typeof (openFiles), typeof (files))

    var fileOpen = openFiles ? openFiles.filter(el => el.key === currFile).length > 0 : false;

    if (!fileOpen) {
        if (openFiles) {
            var newOpenFiles = [...openFiles]
            newOpenFiles.push(file)
            console.log(newOpenFiles)
            setOpenFiles(newOpenFiles)
        } else {
            if (file) {
                var newOpenFiles = []
                newOpenFiles.push(file)
                console.log(newOpenFiles)
                setOpenFiles(newOpenFiles);
            }
        }
    }

    console.log(openFiles)

    var saveNewCode = (key, code) => {
        console.log("File content changed", key, code, currFile, file.key)
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
            defaultSize={parseInt(localStorage.getItem('splitPosEditorPane') || "400")}
            onChange={(size) => localStorage.setItem('splitPosEditorPane', size)}>
            <MultipleEditors openFiles={openFiles} currFile={currFile} save={saveNewCode} />
            <div className="editor">
                <h6 className="output">Simulation Output</h6>
                <OutputWindow />
            </div>
        </SplitPane>
    );
};

function MultipleEditors(props) {
    console.log(props);
    if (props.openFiles && props.openFiles.length > 0) {
        return <div>
            <div style={{ display: "flex", flexDirection: "row" }}>{
                props.openFiles.map(element => {
                    console.log("Opening window for ", element, props.currFile);
                    return <div className="text-white file-header">{element.name}</div>
                })
            }</div>
            <div style={{ position: "relative" }}>
                {props.openFiles.map(element => {
                    return <div style={{ margin: "5px", position: "absolute", zIndex: props.currFile === element.key ? 10 : 0 }}>
                        <CodeMirror
                            value={element.content}
                            theme={oneDark}
                            extensions={[javascript({ jsx: true })]}
                            height="35vh"
                            width="87vw"
                            onChange={(value, viewUpdate) => {
                                props.save(value);
                            }}
                        />
                    </div>
                })}
            </div>
        </div>
    }
    else {
        return <></>
    }

}

function EditorWindow(props) {
    console.log(props.file)
    return;
}

