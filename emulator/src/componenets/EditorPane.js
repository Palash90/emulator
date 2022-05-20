import { useContext, useState } from "react";
import FileContext from "./FileContext";
import SplitPane from "react-split-pane";


import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-vhdl";
import "prismjs/themes/prism.css";

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
            <div >
                <p className="file-header">{fileName}</p>
                <Editor
                    value={content}
                    onValueChange={(content) => saveNewCode(content)}
                    highlight={(content) => highlight(content, languages.vhdl)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                    }}
                />
            </div>
            <div>
                Output Window
            </div>
        </SplitPane>
    );
};

