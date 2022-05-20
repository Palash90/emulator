import NewFile from "./NewFile";
import FileContext from "./FileContext";
import { useContext } from "react";

function FilesPane() {
    const { files, setCurrFile } = useContext(FileContext);
    return (<div  >
      <h4>Files:</h4>
      <ul>
        {files.map((el, i) => {
          return FileDisplay(i, setCurrFile, el);
        })}
      </ul>
      <NewFile></NewFile>
    </div>);
  }
  
  function FileDisplay(i, setCurrFile, el) {
    if (el && el.name && el.name !== '') {
      return <li key={i}>
        <a href="#" onClick={() => setCurrFile(el.id)}>
          {el.name}
        </a>
      </li>;
    } else {
      return <></>
    }
  }

  export default FilesPane;
  