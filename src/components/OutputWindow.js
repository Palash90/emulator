import { useContext } from "react";
import SimulationContext from "./SimulationContext";

function OutputWindow() {
    const { simulationResult } = useContext(SimulationContext);

    console.log(simulationResult)
    if (simulationResult && Object.keys(simulationResult).length === 0 && Object.getPrototypeOf(simulationResult) === Object.prototype) {
        return <></>
    }

    if (simulationResult && simulationResult.error) {
        return <div className="text-warning  border border-secondary" role="output">{simulationResult.errorMessage}</div>
    } else {
        return <div className="text-info  border border-secondary" role="output">{JSON.stringify(simulationResult.result)}</div>
    }

}

export default OutputWindow;