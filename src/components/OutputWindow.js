import { useContext } from "react";
import SimulationContext from "./SimulationContext";

function OutputWindow(props) {
    const { simulationResult } = useContext(SimulationContext);
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    if (simulationResult && Object.keys(simulationResult).length === 0 && Object.getPrototypeOf(simulationResult) === Object.prototype) {
        return <></>
    }

    if (simulationResult && simulationResult.error) {
        return <pre className="text-warning  border border-secondary" style={{ textAlign: 'left', wordWrap: 'break-word', whiteSpace: 'pre-wrap', overflowY: "scroll", width: (vw * 99 / 100 - props.editorWidth) + "px", marginTop: '10px', height: vh * 85 / 100 + "px" }} role="output">{simulationResult.errorMessage}</pre>
    } else {
        return <pre className="text-info  border border-secondary" style={{ textAlign: 'left', overflowY: "scroll", width: (vw * 99 / 100 - props.editorWidth) + "px", marginTop: '10px', height: vh * 85 / 100 + "px" }} role="output">{JSON.stringify(simulationResult.result, null, 2)}</pre>
    }

}

export default OutputWindow;