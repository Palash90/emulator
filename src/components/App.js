
import { useContext, useState, useEffect } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPane from "./MainPane";
import defaultFiles from './defaultFiles';
import { Modal, Button } from "react-bootstrap";
import SimulationContext from "./SimulationContext";
import ModalContext from "./ModalContext";
import FileContext from "./FileContext";
import { isMobile } from 'react-device-detect';
import ScreenSizeContext from './ScreenSizeContext';

const storedFiles = JSON.parse(localStorage.getItem('files'));
const existingFiles = storedFiles && storedFiles.length > 0 ? storedFiles || defaultFiles : defaultFiles;

function MinimalHardwareEmulator() {
  var ivw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  var ivh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  const [simulationResult, setSimulationResult] = useState({});
  const [vw, setVw] = useState(ivw);
  const [vh, setVh] = useState(ivh);
  const [currFile, setCurrFile] = useState();
  const [files, setFiles] = useState(existingFiles);
  const [openFiles, setOpenFiles] = useState();
  const [modalOptions, setModalOptions] = useState({});

  useEffect(() => {
    function handleResize() {
      setVw(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0))
      setVh(Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0))
    }
    window.addEventListener('resize', handleResize);
    return _ => {
      window.removeEventListener('resize', handleResize);
    }
  })

  if (isMobile) {
    return <div>This application can only be viewed on Desktop Browser</div>
  }

  return (
    <div className="App">
      <ScreenSizeContext.Provider value={{ vw, vh }}>
        <ModalContext.Provider value={{ modalOptions, setModalOptions }}>
          <SimulationContext.Provider value={{ simulationResult, setSimulationResult }}>
            <FileContext.Provider value={{ files, setFiles, currFile, setCurrFile, openFiles, setOpenFiles }}>
              <MainPane />
              <ModalWindow />
            </FileContext.Provider>
          </SimulationContext.Provider>
        </ModalContext.Provider>
      </ScreenSizeContext.Provider>
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
    keyboard={false}
    size='sm'
    className="special_modal"
    style={modalOptions.info ? { color: "var(--bs-info)" } : { color: "var(--bs-warning)" }}
  >
    {
      modalOptions.info ? <></> :
        <Modal.Header closeButton>
          <Modal.Title>{modalOptions.title}</Modal.Title>
        </Modal.Header>
    }
    < Modal.Body >
      {modalOptions.body}
    </ Modal.Body >
    {
      modalOptions.info ? <></> :
        <Modal.Footer>
          <Button variant="primary" onClick={() => closeModal()}>
            Close
          </Button>
          <Button variant="danger" onClick={() => closeModalWithAction()}>Understood</Button>
        </Modal.Footer>
    }
  </Modal >
}
export default MinimalHardwareEmulator;

