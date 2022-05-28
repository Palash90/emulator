import { useContext } from "react";
import SimulationContext from "./SimulationContext";

function OutputWindow() {
    const { simulationResult } = useContext(SimulationContext);

    if (simulationResult && Object.keys(simulationResult).length === 0 && Object.getPrototypeOf(simulationResult) === Object.prototype) {
        return <></>
    }

    if (simulationResult && simulationResult.error) {
        return <pre className="text-warning  border border-secondary" role="output">{simulationResult.errorMessage}</pre>
    } else {
        return <pre className="text-info  border border-secondary" style={{ overflowY: "scroll", height: "200px" }} role="output">{JSON.stringify(simulationResult.result, null, 2)}</pre>
    }

}

export default OutputWindow;