import { useContext } from "react";
import FileContext from "./FileContext";
import SplitPane from "react-split-pane";

export const EditorPane = (props) => {
    const { files, currFile } = useContext(FileContext);
    const file = files.find((el) => el.id === currFile);

    var content = "default"

    if (file) {
        if (file.content) {
            content = file.content;
        } else {
            content = file.id + " -> " + file.name;
        }
    }

    return (

        <SplitPane split="horizontal"
            minSize={400}
            defaultSize={parseInt(localStorage.getItem('splitPosEditorPane'), 10)}
            onChange={(size) => localStorage.setItem('splitPosEditorPane', size)}>
            <div >
                Editor Window
            </div>
            <div>
                Output Window
            </div>
        </SplitPane>
    );

};