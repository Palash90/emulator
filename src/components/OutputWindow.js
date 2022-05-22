import { useContext } from "react";
import SimulationContext from "./SimulationContext";

function OutputWindow() {
    const { simulationResult } = useContext(SimulationContext);

    console.log(simulationResult)
    if (simulationResult && Object.keys(simulationResult).length === 0 && Object.getPrototypeOf(simulationResult) === Object.prototype) {
        return <></>
    }

    if (simulationResult && simulationResult.error) {
        return <div className="alert alert-warning" role="alert">{simulationResult.errorMessage}</div>
    } else {
        return <div className="alert alert-success" role="alert">{JSON.stringify(simulationResult.result)}</div>
    }

}

export default OutputWindow;