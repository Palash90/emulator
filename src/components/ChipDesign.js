import { useContext } from "react";
import SimulationContext from "./SimulationContext";
import SVG from 'react-inlinesvg';


export default function ChipDesign() {
    const { simulationResult } = useContext(SimulationContext);
    var iconStr;

    console.log(simulationResult);

    if (simulationResult.ast.icon) {
        iconStr = simulationResult.ast.icon;
    } else {
        iconStr = '<svg width="120" height="100">' +
            '<defs>' +
            '<linearGradient id="grad3" x1="0%" y1="100%" x2="100%" y2="0%">' +
            '<stop offset="10%" style="stop-color:#0c0c0c;stop-opacity:1" />' +
            '<stop offset="90%" style="stop-color:#4D4855;stop-opacity:1" />' +
            '</linearGradient>' +
            '</defs>' +
            '<g><rect width="100" height="80" style="fill:url(#grad3);fill-opacity=1;stroke-width:1;stroke:rgb(0,0,0)"/>' +
            '<text x="50" y="40" font-family="Verdana" font-size="10" fill="blue" text-anchor="middle">' + simulationResult.ast.chip + '</text></g>' +
            '</svg>'
    }

    return <>
        <div className="svg-container">
            <svg viewBox="0 0 100 100">
                <SVG src={iconStr} />
            </svg>
        </div>
    </>
}