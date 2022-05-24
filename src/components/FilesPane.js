import NewFile from "./NewFile";
import FileContext from "./FileContext";
import { useContext } from "react";

function FilesPane() {
  const { files, currFile, setCurrFile } = useContext(FileContext);
  var newFiles = [...files]
  var sortedFiles = newFiles.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

  console.log(files)

  return (
    <div  >
      <h6>Files:</h6>
      <ul>
        {sortedFiles.map((el, i) => {
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
