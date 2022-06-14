import NewFile from "./NewFile";
import FileContext from "./FileContext";
import { useContext } from "react";
import { CloseButton } from "react-bootstrap";
import ModalContext from "./ModalContext";
import ScreenSizeContext from "./ScreenSizeContext";

function FilesPane(props) {
  const { files, setFiles, currFile, setCurrFile } = useContext(FileContext);
  const { setModalOptions } = useContext(ModalContext);
  const { vw, vh } = useContext(ScreenSizeContext);

  const handleClose = (key) => {
    deleteFile(key);
  }

  const handleShow = (key) => {
    var file = files.filter(el => el.key === key)[0];
    var modalTitle = "Delete " + (file ? file.name : "") + "?";
    setModalOptions({ confirmAction: () => handleClose(key), showModal: true, title: modalTitle, body: "If you delete this file, you will not be able to retrieve it and all other files which import this file will fail." });
  }

  var deleteFile = (key) => {
    if (currFile === key) {
      setCurrFile(-1);
    }
    var newFiles = files.filter(el => el.key !== key);
    setFiles([...newFiles]);
  };

  var newFiles = [...files]
  var sortedFiles = newFiles.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

  return (
    <div>
      <h6>Files:</h6>
      <ul  style={{ height:vh*2/3, overflowY: "auto" }}>
        {sortedFiles.map((el, i) => {
          return FileDisplay(i, currFile, setCurrFile, el, handleShow, props.setEditorEnabled, props.setHelpEnabled);
        })}
      </ul>
      <NewFile setEditorEnabled={props.setEditorEnabled} setHelpEnabled={props.setHelpEnabled}></NewFile>
    </div>
  );
}

function FileDisplay(i, currFile, setCurrFile, el, handleShow, setEditorEnabled, setHelpEnabled) {
  if (el && el.name && el.name !== '') {
    return <div key={el.key}>
      <li className={el.key === currFile ? "selectedFile" : "unselectedFile"}>
        <a key={i} href="#" onClick={() => { setEditorEnabled(true); setHelpEnabled(false); setCurrFile(el.key) }}>
          {el.name}
        </a >
        <CloseButton key={"Close-" + el.key} className="btn-close btn-close-white" style={{ width: '2px', height: '2px', verticalAlign: 'top', margin: '7px', padding: '0.3em 0.3em' }} onClick={() => handleShow(el.key)} />
      </li>
    </div>
  } else {
    return <></>
  }
}

export default FilesPane;
