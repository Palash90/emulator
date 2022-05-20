import { useContext } from "react";
import SimulationContext from "./SimulationContext";

function OutputWindow() {
    const { simulationResult } = useContext(SimulationContext);

    if (simulationResult && simulationResult.error) {
        return <div className="alert alert-warning" role="alert">{simulationResult.errorMessage}</div>
    } else {
        return  <div className="alert alert-success" role="alert">{simulationResult.result}</div>
    }

}

export default OutputWindow;