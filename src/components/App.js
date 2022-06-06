
import { useContext, useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPane from "./MainPane";
import defaultFiles from './defaultFiles';
import { Modal, Button } from "react-bootstrap";
import SimulationContext from "./SimulationContext";
import ModalContext from "./ModalContext";
import FileContext from "./FileContext";
import { isMobile } from 'react-device-detect';

const storedFiles = JSON.parse(localStorage.getItem('files'));
const existingFiles = storedFiles && storedFiles.length > 0 ? storedFiles || defaultFiles : defaultFiles;

function App() {
  const [simulationResult, setSimulationResult] = useState({});
  const [currFile, setCurrFile] = useState(7);
  const [files, setFiles] = useState(existingFiles);
  const [openFiles, setOpenFiles] = useState();
  const [modalOptions, setModalOptions] = useState({});

  if (isMobile) {
    return <div>This application can only be viewed on Desktop Browser</div>
  }

  return (
    <div className="App">
      <ModalContext.Provider value={{ modalOptions, setModalOptions }}>
        <SimulationContext.Provider value={{ simulationResult, setSimulationResult }}>
          <FileContext.Provider value={{ files, setFiles, currFile, setCurrFile, openFiles, setOpenFiles }}>
            <MainPane />
            <ModalWindow />
          </FileContext.Provider>
        </SimulationContext.Provider>
      </ModalContext.Provider>
    </div>
  );
}

function ModalWindow() {

  const { modalOptions, setModalOptions } = useContext(ModalContext);

  var closeModal = () => setModalOptions(Object.assign({}, modalOptions, { showModal: false }));

  var closeModalWithAction = () => {
    modalOptions.confirmAction();
    closeModal();
  }

  return <Modal
    show={modalOptions.showModal}
    onHide={closeModal}
    backdrop="static"
    keyboard={modalOptions.info}
    size='sm'
    className="special_modal"
  >
    {
      modalOptions.info ? <></> :
        <Modal.Header closeButton>
          <Modal.Title>{modalOptions.title}</Modal.Title>
        </Modal.Header>
    }
    <Modal.Body>
      {modalOptions.body}
    </Modal.Body>
    {modalOptions.info ? <></> :
      <Modal.Footer>
        <Button variant="primary" onClick={() => closeModal()}>
          Close
        </Button>
        <Button variant="danger" onClick={() => closeModalWithAction()}>Understood</Button>
      </Modal.Footer>}
  </Modal>
}
export default App;

