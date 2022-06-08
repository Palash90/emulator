import { useContext, useState } from "react";
import SimulationContext from "./SimulationContext";
import TruthTable from "./TruthTable";
import ChipDesign from "./ChipDesign";
import SVG from 'react-inlinesvg';

function OutputWindow(props) {
    const { simulationResult } = useContext(SimulationContext);
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    if (typeof (simulationResult) === 'string') {
        var svgStr = simulationResult.replace('$height', 80);
        svgStr = svgStr.replace("$width", 100);
        svgStr = svgStr.replace("$txtPosX", 50);
        svgStr = svgStr.replace("$txtPosY", 40);
        return <div className="svg-container">
            <svg viewBox="0 0 100 100">
                <SVG src={svgStr} />
            </svg>
        </div>
    }

    if (simulationResult && Object.keys(simulationResult).length === 0 && Object.getPrototypeOf(simulationResult) === Object.prototype) {
        return <></>
    }

    if (simulationResult && simulationResult.error) {
        return <pre className="text-warning  border border-secondary" style={{ textAlign: 'left', wordWrap: 'break-word', whiteSpace: 'pre-wrap', overflowY: "scroll", width: (vw * 99 / 100 - props.editorWidth) + "px", marginTop: '10px', height: vh * 85 / 100 + "px" }} role="output">{JSON.stringify(simulationResult.errorMessage)}</pre>
    } else {
        return <>
            <ChipDesign />
            {
                simulationResult.ast.inputs.length <= 4 ? <TruthTable /> : <></>
            }
        </>
    }
}

export default OutputWindow;