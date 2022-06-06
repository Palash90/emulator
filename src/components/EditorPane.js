import { useContext, useState, useEffect } from "react";
import FileContext from "./FileContext";
import "./Editor.css";
import CodeMirror from '@uiw/react-codemirror';
import "codemirror/lib/codemirror.css";
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { CloseButton } from "react-bootstrap";
import uuid from "react-uuid";
import ModalContext from "./ModalContext";

export const EditorPane = (props) => {
    const { files, currFile, setFiles, openFiles, setOpenFiles, setCurrFile } = useContext(FileContext);
    const file = files.find((el) => el.key === currFile);
    var fileOpen = openFiles ? openFiles.filter(el => el === currFile).length > 0 : false;

    const { setModalOptions } = useContext(ModalContext);

    var closeFile = (key) => {
        var newOpenfiles = openFiles.filter(el => el !== key);
        if (newOpenfiles.length > 1) {
            setCurrFile(newOpenfiles[newOpenfiles.length - 1]);
        } else {
            setCurrFile(-1);
        }
        setOpenFiles([...newOpenfiles]);
    };

    var newOpenFiles;

    if (!fileOpen) {
        if (openFiles && openFiles.length > 0) {
            newOpenFiles = [...openFiles]
            handleNewOpenFiles();
        } else {
            newOpenFiles = []
            handleNewOpenFiles();
        }
    }

    const handleShow = (key) => {
        var file = files.filter(el => el.key === key)[0];
        var body = "File " + (file ? file.name : "") + " Saved";
        setModalOptions({ info: true, showModal: true, body: body });
    }

    var saveNewCode = (key, code) => {
        var newFile = { key: key, name: file.name, content: code };
        var newFiles = files.filter(function (f) {
            return f.key !== key;
        });

        newFiles.push(newFile);
        newFiles = newFiles.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        setFiles(newFiles);
        handleShow(key);
    };

    return (
        <MultipleEditors editorWidth={props.editorWidth} openFiles={openFiles} currFile={currFile} setCurrFile={setCurrFile} save={saveNewCode} closeFile={closeFile} />
    );

    function handleNewOpenFiles() {
        if (file) {
            newOpenFiles.push(file.key);
            setOpenFiles(newOpenFiles);
        }
    }
};

function MultipleEditors(props) {
    const { files } = useContext(FileContext);

    var editorContent = {};

    const chooseOrCloseFile = (element, closeFile) => {
        if (!closeFile) {
            props.setCurrFile(element)
        } else {
            props.closeFile(element)
        }
    }

    var getEditorContent = (element, value) => editorContent[element] = value;

    const handleKeyDown = (event, element, value) => {
        let charCode = String.fromCharCode(event.which).toLowerCase();
        if ((event.ctrlKey || event.metaKey) && charCode === 's') {
            event.preventDefault();
            props.save(element, editorContent[element])
        }
    };

    if (props.openFiles && props.openFiles.length > 0) {
        return <div key={uuid()}>
            <div key={uuid()} style={{ display: "flex", flexDirection: "row" }}>{
                props.openFiles.map(element => {
                    var file = files.filter(el => el.key === element)[0];
                    return file ? <div key={uuid()} className="text-white file-header" >
                        <span key={uuid()} onClick={() => chooseOrCloseFile(element, false)}>{file.name}</span>
                        <CloseButton key={uuid()} style={{ width: '2px', height: '2px', verticalAlign: 'top', margin: '3px', padding: '0.3em 0.3em' }} onClick={() => chooseOrCloseFile(element, true)} />
                    </div> : <></>
                })
            }</div>
            <div key={uuid()} style={{ position: "relative" }}>
                {props.openFiles.map(element => {
                    var file = files.filter(el => el.key === element)[0];
                    if (file) {
                        editorContent[element] = file.content;
                    }
                    return file ? <OnlyEditor key={uuid()} save={props.save} getEditorContent={getEditorContent} editorWidth={props.editorWidth} currFile={props.currFile} element={element} file={file} handleKeyDown={handleKeyDown} /> : <></>
                })}
            </div>
        </div>
    }
    else {
        return <></>
    }
}

function OnlyEditor(props) {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const { changed, setChanged } = useState(false);
    const [height, setHeight] = useState(vh * 85 / 100 + "px");
    const [width, setWidth] = useState((vw * 99 / 100 - props.editorWidth) + "px");

    useEffect(() => {
        function handleResize() {
            console.log("handling resize")
            setHeight(vh * 85 / 100 + "px")
            setWidth((vw * 99 / 100 - props.editorWidth) + "px")
        }

        window.addEventListener('resize', handleResize);

        return _ => {
            window.removeEventListener('resize', handleResize);
        }
    })

    var editorValue = props.file.content;

    return <div key={uuid()} style={{ margin: "5px", position: "absolute", textAlign: "left", zIndex: props.currFile === props.element ? 10 : 0 }}>
        <CodeMirror
            value={editorValue}
            theme={oneDark}
            extensions={[javascript({ jsx: true })]}
            height={height}
            width={width}
            onChange={(value, viewUpdate) => {
                editorValue = value;
                props.getEditorContent(props.element, editorValue);
            }}
            onKeyDown={event => props.handleKeyDown(event, props.element, editorValue)}
            key={uuid()} />
    </div>;
}
