import NewFile from "./NewFile";
import FileContext from "./FileContext";
import { useContext } from "react";

function FilesPane() {
  const { files, currFile, setCurrFile } = useContext(FileContext);

  return (
    <div  >
      <h6>Files:</h6>
      <ul>
        {files.map((el, i) => {
          return FileDisplay(i, currFile, setCurrFile, el);
        })}
      </ul>
      <NewFile></NewFile>
    </div>
  );
}

function FileDisplay(i, currFile, setCurrFile, el) {
  if (el && el.name && el.name !== '') {
    return <a key={i} href="#" onClick={() => setCurrFile(el.key)}>
      <li className={el.key == currFile ? "selectedFile" : "unselectedFile"}>
        {el.name}
      </li>
    </a>;
  } else {
    return <></>
  }
}

export default FilesPane;
