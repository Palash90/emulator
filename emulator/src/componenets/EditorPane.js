import { useContext, useState } from "react";
import FileContext from "./FileContext";
import SplitPane from "react-split-pane";


import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

export const EditorPane = (props) => {
    const { files, currFile } = useContext(FileContext);
    const file = files.find((el) => el.id === currFile);

    var content = "default";
    if (file) {
        if (file.content) {
            content = file.content
        } else {
            content = file.id + " -> " + file.name;
        }
    }

    var [code, setCode] = useState(content);
    return (
        <SplitPane split="horizontal"
            minSize={400}
            defaultSize={parseInt(localStorage.getItem('splitPosEditorPane') || "400", 10)}
            onChange={(size) => localStorage.setItem('splitPosEditorPane', size)}>
            <div >
                <Editor
                    value={code}
                    onValueChange={(code) => setCode(code)}
                    highlight={(code) => highlight(code, languages.js)}
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