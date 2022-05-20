import { useContext } from "react";
import FileContext from "./FileContext";

export const EditorPane = (props) => {
    const { files, currFile } = useContext(FileContext);
    const file = files.find((el) => el.id === currFile);
  
    return (
      <div>
        <div className="quote">
          <p>{file && file.content ? file.content : "Hi There"}</p>
        </div>
      </div>
    );
  };