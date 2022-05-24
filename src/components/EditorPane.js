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
    const { files, currFile, setFiles } = useContext(FileContext);
    const file = files.find((el) => el.key === currFile);
    var fileName = '';

    var content = "";
    if (file) {
        content = file.content;
        fileName = file.name
    }


    var saveNewCode = (code) => {
        var newFile = { key: file.key, name: file.name, content: code };
        var newFiles = files.filter(function (f) {
            return f.key !== file.key;
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
            {file ? EditorWindow(fileName, content, saveNewCode) : <></>}
            <div className="editor">
                <h6 className="output">Simulation Output</h6>
                <OutputWindow />
            </div>
        </SplitPane>
    );
};

function EditorWindow(fileName, content, saveNewCode) {
    return <div style={{ margin: "5px" }}>
        <p className="text-white file-header">{fileName}</p>
        <div className="editor">
                    <CodeMirror
                        value={content}
                        theme={oneDark}
                        extensions={[javascript({ jsx: true })]}
                        height="35vh"
                        width="87vw"
                        onChange={(value, viewUpdate) => {
                            saveNewCode(value);
                        }}
                    />
                </div>

    </div>;
}

