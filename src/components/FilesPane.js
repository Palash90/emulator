import NewFile from "./NewFile";
import FileContext from "./FileContext";
import { useContext, useState } from "react";
import { CloseButton } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

function FilesPane() {
  const { files, setFiles, currFile, setCurrFile } = useContext(FileContext);
  const [showModal, setShowModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState();

  var file = files.filter(el => el.key === fileToDelete);
  const handleClose = () => {
    setFileToDelete(-1);
    setShowModal(false);
  }

  const handleShow = (key) => {
    console.log("file to delete", key)
    setFileToDelete(key);
    setShowModal(true);
  }

  var deleteFile = () => {
    console.log("deleting ", fileToDelete)
    if (currFile === fileToDelete) {
      setCurrFile(-1);
    }
    var newFiles = files.filter(el => el.key !== fileToDelete);
    console.log(newFiles, fileToDelete);
    setFiles([...newFiles]);
  };

  var newFiles = [...files]
  var sortedFiles = newFiles.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

  return (
    <div  >
      <h6>Files:</h6>
      <ul>
        {sortedFiles.map((el, i) => {
          return FileDisplay(i, currFile, setCurrFile, el, handleShow);
        })}
      </ul>
      <NewFile></NewFile>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='sm'
        className="special_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete {file ? file.name : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          If you delete this file, you will not be able to recover it and all other files importing this file will start failing.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => { deleteFile(); handleClose(); }}>Understood</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function FileDisplay(i, currFile, setCurrFile, el, handleShow) {
  if (el && el.name && el.name !== '') {
    return <div key={el.key}>
      <li className={el.key == currFile ? "selectedFile" : "unselectedFile"}>
        <a key={i} href="#" onClick={() => setCurrFile(el.key)}>
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
