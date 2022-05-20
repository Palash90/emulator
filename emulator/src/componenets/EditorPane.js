import { useContext } from "react";
import FileContext from "./FileContext";

export const EditorPane = (props) => {
    const { files, currFile } = useContext(FileContext);
    const file = files.find((el) => el.id === currFile);

    console.log("Editor Pane", file, currFile)

    var content = "default"

    if(file){
        content = file.content;
    }

    return (
        
        <div>
            <div className="quote">
                <p>{content}</p>
            </div>
        </div>
    );

};