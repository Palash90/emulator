import { useContext } from "react";
import SimulationContext from "./SimulationContext";
import SVG from 'react-inlinesvg';
import uuid from "react-uuid";



export default function ChipDesign() {
    const { simulationResult } = useContext(SimulationContext);
    console.log(simulationResult);
    return <Chip chip={simulationResult.ast} />
}
function Chip(props) {
    var iconStr;
    var chipHeight = 100;
    var chipWidth = 120;

    var inputLines = props.chip.inputs.length + 2;
    var outputLines = props.chip.outputs.length + 2;
    var inputLinesPosition = [];
    var outputLinesPosition = [];
    for (var i = 1; i < (inputLines - 1); i++) {
        inputLinesPosition.push(i * (chipHeight / inputLines));
    }

    for (var i = 1; i < (outputLines - 1); i++) {
        outputLinesPosition.push(i * (chipHeight / outputLines));
    }

    if (props.chip.icon) {
        iconStr = props.chip.icon;
    } else {
        iconStr = '<svg width="' + 120 + '" height="' + 100 + '">' +
            '<defs>' +
            '<linearGradient id="grad3" x1="0%" y1="100%" x2="100%" y2="0%">' +
            '<stop offset="10%" style="stop-color:#0c0c0c;stop-opacity:1" />' +
            '<stop offset="90%" style="stop-color:#4D4855;stop-opacity:1" />' +
            '</linearGradient>' +
            '</defs>' +
            '<g><rect width="100" height="80" style="fill:url(#grad3);fill-opacity=1;stroke-width:1;stroke:rgb(0,0,0)"/>' +
            '<text x="50" y="40" font-family="Verdana" font-size="10" fill="blue" text-anchor="middle">' + props.chip.chip + '</text></g>' +
            '</svg>'
    }

    return <>
        <div className="svg-container">
            <svg viewBox="0 0 100 100">
                <g>
                    <SVG src={iconStr} />
                    {
                        inputLinesPosition.map(inputLine => {
                            return <line key={uuid()} x1="-30" x2="0" y1={inputLine} y2={inputLine} stroke="orange" strokeWidth="2" />
                        })
                    }

                    {
                        outputLinesPosition.map(outputLine => {
                            return <line key={uuid()} x1="100" x2="130" y1={outputLine} y2={outputLine} stroke="orange" strokeWidth="2" />
                        })
                    }

                </g>
            </svg>
        </div>
    </>
}