import NewFile from "./NewFile";
import FileContext from "./FileContext";
import { useContext } from "react";
import { CloseButton } from "react-bootstrap";

function FilesPane() {
  const { files, currFile, setCurrFile } = useContext(FileContext);
  var newFiles = [...files]
  var sortedFiles = newFiles.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

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
    return <div key={el.key}>
      <li className={el.key == currFile ? "selectedFile" : "unselectedFile"}>
        <a key={i} href="#" onClick={() => setCurrFile(el.key)}>
          {el.name}
        </a >
        <CloseButton className="btn-close btn-close-white" style={{  width: '2px', height: '2px', verticalAlign: 'top', margin: '7px', padding: '0.3em 0.3em' }} onClick={() => alert("Delete File " + el.key)} />
      </li>
    </div>
  } else {
    return <></>
  }
}

export default FilesPane;
